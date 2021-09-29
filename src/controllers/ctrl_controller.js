const elliptic = require('elliptic');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const models = require('../models/models');

const {create_slot} = require('../helpers/signup-helper');
const {isValidEmail} = require('../utils/validators');
const {sendConformationEmail, sendSubscribeEmail} = require('../helpers/email-helper');

const ec = new elliptic.ec('secp256k1');

const {
    VALUE,
    PARAM_UNDEFINED,
    TYPE_ERROR,
    INTERNAL_ERROR_API,
    TYPE_UNKNOWN,
    SIGNATURE_INVALID,
    FREE_TIER_LIMIT
} = require('../utils/constants');

const {
    start_time,
    reply_err,
    reply_msg,
} = require('../utils/controller_helpers');

const DATE_FORMAT = 'HH:mm:ss L';

module.exports = {
    ctrl_latest_attestation: async (req, res) => {

        res.header('Access-Control-Allow-Origin', '*');

        const response = {'data': []};

        const page = parseInt(req.query.page, 10) || 1;
        const limit = 20;
        const start = !page ? 0 : limit * (page - 1);

        // set confirmed only filter unless failed flag is set to true
        const confirmedFilter = req.query.failed ? (req.query.failed === 'true' ? {} : {confirmed: true}) : {confirmed: true};

        try {
            const [count, data] = await Promise.all([
                models.attestation.countDocuments({confirmed: true}),
                models.attestation
                    .find(confirmedFilter)
                    .sort({inserted_at: -1})
                    .limit(limit)
                    .skip(start)
                    .exec(),
            ]);

            response['total'] = count;
            response['pages'] = Math.ceil(count / limit);
            response['limit'] = limit;

            const now = new Date();

            response['data'] = data.map(item => ({
                txid: item.txid,
                merkle_root: item.merkle_root,
                confirmed: item.confirmed,
                age: (now.toDateString() === item.inserted_at.toDateString()) ? moment.utc(item.inserted_at).format('HH:mm:ss') : moment.utc(item.inserted_at).format(DATE_FORMAT)
            }));

            res.json(response);

        } catch (error) {
            res.json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_latest_attestation_info: async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');

        try {
            const data = await models.attestationInfo
                .find()
                .sort({time: -1})
                .limit(10)
                .exec();

            const response = data.map(item => ({
                txid: item.txid,
                blockhash: item.blockhash,
                amount: item.amount,
                time: moment.utc(item.time * 1000).format(DATE_FORMAT)
            }));

            res.json(response);
        } catch (error) {
            res.json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_latest_commitment: async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');

        const response = [];

        try {
            const data = await models.attestation
                .find({confirmed: true})
                .sort({inserted_at: -1})
                .limit(1)
                .exec();

            if (data.length === 0) {
                return res.json(response);
            }

            const merkleCommitmentData = await models.merkleCommitment
                .find({merkle_root: data[0].merkle_root})
                .exec();

            for (let itr = 0; itr < merkleCommitmentData.length; ++itr) {
                response.push({
                    position: merkleCommitmentData[itr].client_position,
                    merkle_root: merkleCommitmentData[itr].merkle_root,
                    commitment: merkleCommitmentData[itr].commitment,
                });
            }
            res.json(response);
        } catch (error) {
            res.json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_send_commitment: async (req, res) => {

        try {
            const payload = req.body;
            if (payload.position === undefined) {
                return res.json({error: 'position'});
            }
            if (payload.token === undefined) {
                return res.json({error: 'token'});
            }
            if (payload.commitment === undefined) {
                return res.json({error: 'commitment'});
            }

            const data = await models.clientDetails.find({client_position: payload.position});
            if (data.length === 0) {
                return res.json({error: 'position'});
            }
            if (data[0].auth_token !== payload.token) {
                return res.json({error: 'token'});
            }
            if (data[0].pubkey && data[0].pubkey !== '') {
                if (payload.signature === undefined) {
                    return res.json({error: 'signature'});
                }
                try {
                    // get pubkey hex
                    const pubkey = ec.keyFromPublic(data[0].pubkey, 'hex');

                    // get base64 signature
                    const sig = Buffer.from(payload.signature, 'base64');
                    if (!ec.verify(payload.commitment, sig, pubkey)) {
                        return res.json({error: 'signature'});
                    }

                } catch (error) {
                    return res.json({
                        error: SIGNATURE_INVALID,
                        message: error.message
                    });
                }
            }

            if (data[0].service_level === 'free') {

                const latest_com = await models.clientCommitment.find({client_position: payload.position});
                const today = new Date().toLocaleDateString();

                if (latest_com[0].date === today) {
                    return res.json({
                        error: FREE_TIER_LIMIT,
                        message: 'Free tier limit exceeded.'
                    });
                } else {
                    await models.clientCommitment.findOneAndUpdate({client_position: payload.position}, {
                        commitment: payload.commitment,
                        date: today
                    }, {upsert: true});
                    return res.send();
                }
            } else {
                await models.clientCommitment.findOneAndUpdate({client_position: payload.position}, {commitment: payload.commitment}, {upsert: true});
                return res.send();
            }
        } catch (error) {
            res.json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_client_signup_verify: async (req, res) => {
        const {code} = req.query;
        const {clientSignup} = models;
        const signup = await clientSignup.findOne({verify_code: code});
        if (!signup) {
            return res.status(404).json({
                error: 'api',
                message: 'User not found'
            });
        }

        signup.verify_code = undefined;
        signup.status = 'email_confirmed';
        await signup.save();

        if (signup.service_level === 'free') {
            await create_slot(signup);
        } else {
            signup.code = uuidv4();
            await signup.save();
            await sendSubscribeEmail(signup);
        }
        res.json({signup});
    },

    ctrl_client_signup: async (req, res) => {

        const payload = req.body;

        if (!payload.first_name || !payload.first_name.trim()) {
            return res.status(400).json({error: 'first_name'});
        }
        if (!payload.last_name || !payload.last_name.trim()) {
            return res.status(400).json({error: 'last_name'});
        }
        if (!payload.email || !payload.email.trim() && !isValidEmail(payload.email.trim())) {
            return res.status(400).json({error: 'email'});
        }
        if (!payload.service_level || !models.serviceLevels.includes(payload.service_level)) {
            return res.status(400).json({error: 'service_level'});
        }

        payload.first_name = payload.first_name.trim();
        payload.last_name = payload.last_name.trim();
        payload.email = payload.email.trim();

        if (payload.company && payload.company.trim()) {
            payload.company = payload.company.trim();
        }

        if (payload.pubkey && payload.pubkey.trim()) {
            payload.pubkey = payload.pubkey.trim();
            try {
                const pubkey = ec.keyFromPublic(payload.pubkey, 'hex');
                const {result, reasonIgnored} = pubkey.validate();
                if (!result) {
                    return res.status(400).json({
                        error: 'pubkey',
                        message: 'Invalid Public Key'
                    });
                }
            } catch (errorIgnored) {
                return res.status(500).json({
                    error: 'api',
                    message: 'Invalid Public Key'
                });
            }
        }

        try {
            // get user by emil to check if user already logged in
            const userByEmail = await models.clientSignup.findOne({email: payload.email});
            if (userByEmail) {
                return res.status(400).json({
                    error: 'api',
                    message: 'A user with this email already exists.'
                });
            }

            // save user
            const user = await models.clientSignup.create({
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                service_level: payload.service_level,
                company: payload.company,
                pubkey: payload.pubkey,
                verify_code: uuidv4(),
            });
            // send the response
            res.status(201).json({user});

            await sendConformationEmail(user);
        } catch (error) {
            return res.status(500).json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_type: (req, res) => {
        const startTime = start_time();
        const paramValue = req.query[VALUE];
        if (paramValue === undefined) {
            return reply_err(res, PARAM_UNDEFINED, startTime);
        } else if (/[0-9A-Fa-f]{64}/g.test(paramValue)) {
            return find_type_hash(res, paramValue, startTime);
        } else if (/^\d+$/.test(paramValue)) {
            return find_type_number(res, paramValue, startTime);
        }
        reply_err(res, TYPE_ERROR, startTime);
    },

    crtl_signupbycode: async (req, res) => {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({
                error: 'api',
                message: 'code not provided.'
            });
        }
        try {
            const signup = await models.clientSignup.findOne({code});
            res.send({signup});
        } catch (error) {
            return res.status(500).json({
                error: 'api',
                message: error.message
            });
        }
    },

    ctrl_chargebeesubscription: async (req, res) => {
        const {hostedPageId, signupId} = req.body;

        if (!hostedPageId || !signupId) {
            return res.status(400).json({
                error: 'api',
                message: 'wrong params'
            });
        }

        try {
            const signup = await models.clientSignup.findOne({_id: signupId});
            if (!signup) {
                return res.status(400).json({
                    error: 'api',
                    message: 'signup not found'
                });
            }
            signup.status = 'payment_ok';
            signup.hosted_page_id = hostedPageId;
            // set code to null to avoid double subscription
            signup.code = undefined;
            await signup.save();

            res.send({signup});
        } catch (error) {
            return res.status(500).json({
                error: 'api',
                message: error.message
            });
        }
    }

};

async function find_type_hash(res, paramValue, startTime) {
    try {
        let data;
        data = await models.merkleProof.find({commitment: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'commitment', startTime);
        }
        data = await models.merkleProof.find({merkle_root: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'merkle_root', startTime);
        }
        data = await models.attestationInfo.find({txid: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'txid', startTime);
        }
        data = await models.attestationInfo.find({blockhash: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'blockhash', startTime);
        }
        reply_err(res, TYPE_UNKNOWN, startTime);
    } catch (errorIgnored) {
        return reply_err(res, INTERNAL_ERROR_API, startTime);
    }
}

async function find_type_number(res, paramValue, startTime) {
    try {
        const data = await models.clientDetails.find({client_position: paramValue});
        if (data.length !== 0) {
            return reply_msg(res, 'position', startTime);
        }
        reply_err(res, 'Not found', startTime);
    } catch (errorIgnored) {
        return reply_err(res, INTERNAL_ERROR_API, startTime);
    }
}
