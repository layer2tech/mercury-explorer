const models = require('../../models/models');

class ClientSignUpController {

    async list(req, res, next) {
        try {
            const list = await models.clientSignup.find().lean(true);
            res.json({
                data: {
                    clientSignups: list,
                    statuses: models.clientSignupStatuses
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async patch(req, res, next) {
        const {id} = req.params;
        const {status, kyc_id} = req.body;

        if (status && !models.clientSignupStatuses.includes(status)) {
            return res.status(406).json({
                error: {
                    code: 'wrong_params',
                    message: 'Wrong status provided.'
                }
            });
        }

        try {
            const clientSignup = await models.clientSignup.findOne({_id: id});

            if (!clientSignup) {
                return res.status(404).json({
                    error: {
                        code: 'not_found',
                        message: 'Client signup not found'
                    }
                });
            }

            status && (clientSignup.status = status);
            kyc_id && (clientSignup.kyc_id = kyc_id);
            await clientSignup.save();
            res.json({
                data: clientSignup.toJSON()
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ClientSignUpController();
