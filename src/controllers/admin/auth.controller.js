const jwt = require('jsonwebtoken');
const env = require('../../env');

class AuthController {
    async login(req, res) {
        const adminCredentials = env.admin;
        const jwtSecret = env.jwt.secret;

        // send error response if login or pass are incorrect
        if (req.body.login !== adminCredentials.login || req.body.password !== adminCredentials.password) {
            return res.status(400).json({
                error: {
                    code: 'wrong_login_credentials',
                    message: 'wrong login or password'
                }
            });
        }
        // generate jwt token and via header
        const token = jwt.sign({
            data: 'logged-in'
        }, jwtSecret, {expiresIn: '1h'});
        return res.set('X-Access-Token', token).json({data: null});
    }
}

module.exports = new AuthController();
