const uuidv4 = require('uuid/v4');
const elliptic = require('elliptic');
const models = require('../../models/models');

const ec = new elliptic.ec('secp256k1');

class ClientDetailsController {

    async list(req, res, next) {
        const clientDetailsModel = models.clientDetails;
        try {
            const list = await clientDetailsModel.find();
            res.json({data: list});
        } catch (error) {
            next(error);
        }
    }

    async post(req, res, next) {
        const clientDetailsModel = models.clientDetails;
        const clientCommitmentModel = models.clientCommitment;

        let clientName = '';
        let publicKey = '';
        let authToken;

        if (req.body.pubkey && req.body.pubkey.trim()) {
            publicKey = req.body.pubkey.trim();
            try {
                const publicKeyEc = ec.keyFromPublic(publicKey, 'hex');
                const {result, reason} = publicKeyEc.validate();
                if (!result) {
                    return res.status(400).json({
                        error: 'error_public_key',
                        message: `Invalid Public Key: ${reason}`
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    error: 'error_public_key',
                    message: `Invalid Public Key: ${error.message}`
                });
            }
        }

        if (req.body.client_name && req.body.client_name.trim()) {
            clientName = req.body.client_name.trim();
        }

        if (req.body.auth_token && req.body.auth_token.trim()) {
            authToken = req.body.auth_token.trim();
        } else {
            authToken = uuidv4();
        }

        try {
            // fetch item with max client_position
            const maxPositionClientDetails = await clientDetailsModel
                .findOne()
                .sort({client_position: -1})
                .limit(1);

            let nextClientPosition;
            if (maxPositionClientDetails === null) {
                nextClientPosition = 0;
            } else {
                nextClientPosition = maxPositionClientDetails.client_position + 1;
            }
            // create new client-detail
            const clientDetailsData = {
                client_position: nextClientPosition,
                auth_token: authToken,
                client_name: clientName,
                pubkey: publicKey,
            };
            const clientDetails = new clientDetailsModel(clientDetailsData);
            await clientDetails.save();

            // create client-commitment
            const clientCommitmentData = {
                client_position: clientDetails.client_position,
                commitment: '0000000000000000000000000000000000000000000000000000000000000000'
            };
            const clientCommitment = new clientCommitmentModel(clientCommitmentData);
            await clientCommitment.save();

            res.status(201).json({
                data: {
                    clientDetails,
                    clientCommitment
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async put(req, res, next) {
        const clientDetailsModel = models.clientDetails;
        const _id = req.body._id;
        let clientName = '';
        let publicKey = '';
        let authToken = '';

        if (req.body.pubkey && req.body.pubkey.trim()) {
            publicKey = req.body.pubkey.trim();
            try {
                const publicKeyEc = ec.keyFromPublic(publicKey, 'hex');
                const {result, reason} = publicKeyEc.validate();
                if (!result) {
                    return res.status(400).json({
                        error: 'error_public_key',
                        message: `Invalid Public Key: ${reason}`
                    });
                }
            } catch (error) {
                return res.status(400).json({
                    error: 'error_public_key',
                    message: `Invalid Public Key: ${error.message}`
                });
            }
        }

        if (req.body.client_name && req.body.client_name.trim()) {
            clientName = req.body.client_name.trim();
        }

        if (req.body.auth_token && req.body.auth_token.trim()) {
            authToken = req.body.auth_token.trim();
        } else {
            authToken = uuidv4();
        }

        try {
            const clientDetails = await clientDetailsModel.findOne({_id});
            if (!clientDetails) {
                return res.status(404).json({
                    error: {
                        code: 'client_not_found',
                        message: 'Client not found'
                    }
                });
            }

            clientDetails.auth_token = authToken;
            clientDetails.pubkey = publicKey;
            clientDetails.client_name = clientName;
            await clientDetails.save();
            return res.json({
                data: clientDetails
            });
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new ClientDetailsController();
