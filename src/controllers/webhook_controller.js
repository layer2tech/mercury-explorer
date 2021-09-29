const axios = require('axios');
const url = require('url');

const env = require('../../src/env');
const models = require('../../src/models/models');
const EmailHelper = require('../../src/helpers/email-helper');

const ONFIDO_REQUEST_HEADERS = {
    'Authorization': 'Token token=' + env.kyc.token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

class WebhookController {
    async index(req, res) {
        const {resource_type, action, object} = req.body.payload;
        console.log(action, object.id, object.href);
        if (resource_type === 'check') {
            if (action === 'check.completed') {
                await this.checkCompleted(object);
            }
        } else if (resource_type === 'report') {
            // report webhooks are not implemented
        }
        res.json({});
    }

    async checkCompleted(data) {
        const onfidoApiUrl = data.href;

        // make onfido request to check status
        const checkResponse = await axios.get(onfidoApiUrl,
            {
                headers: ONFIDO_REQUEST_HEADERS,
            });

        let check = checkResponse.data;

        // status should be complete
        if (check.status !== 'complete') {
            return null;
        }

        const pathname = url.parse(onfidoApiUrl).pathname;
        const kycId = pathname.split('/')[3];
        const signup = await models.clientSignup.findOne({kyc_id: kycId});
        if (!signup) {
            console.error(`Signup with ${kycId} not found.`);
            return null;
        }
        if (check.result === 'clear') {
            signup.status = 'kyc_ok';
            await EmailHelper.sendSubscribeEmail(signup);
        }
        if (check.result === 'consider') {
            signup.status = 'kyc_fail';
        }
        return await signup.save();

    }
}

module.exports = new WebhookController();
