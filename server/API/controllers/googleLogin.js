const config = require('../Config/databaseConfig.js');
const connection = config.connection;
const jwt = require('jsonwebtoken');
const request = require("request");
const totp = require('totp-generator');
module.exports.getEmailByGoogle = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    const redirect_uri = 'https://localhost/social-login';
    const code = req.body.code;
    const CLIENT_ID = '311273134850-ghrf1kk9icinsn5tom9hhkduq8irlg4f.apps.googleusercontent.com';
    const CLIENT_SECRET = 'Ix1SlWtXQLcf1lycK0F97Yog';
    // console.log(code);
    const url = 'https://oauth2.googleapis.com/token?grant_type=authorization_code&redirect_uri=' + redirect_uri + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + code;
    request.post(url, function (error, response, body) {
        if (error) {
            res.send({ code: error });
        } else {
            const id_token = JSON.parse(response.body).id_token;
            const user = jwt.decode(id_token);
            const email = user.email;
            const loginType = 'social';
            const totpCode = totp('BP26TDZUZ5SVPZJRIHCAUVREO5EWMHHV');
            // ---- TOTO-----
            const url = 'https://www.instaspaces.in/NewWebLogin?RequestType=client&email=' + email + '&loginType=' + loginType + '&code=' + totpCode;
            request.post(url, function (error, response) {
                if (error) {
                    console.log(error);
                } else {
                    const message = JSON.parse(response.body).message;
                    const token = JSON.parse(response.body).token;
                    if (message === 1) {
                        const sql = "SELECT id, uname, email, mobile, mverified from customers  WHERE  email = ?";
                        connection.query(sql, email, function (error, results) {
                            if (error) {
                                res.status(400).send('Error in database operation');
                            } else {
                                res.send({ response: message, data: results, token: token });
                            }
                        });
                    } else if (message === 0) {
                        res.send({ response: message });
                    } else if (message === 2) {
                        res.send({ response: message, emailAddress: email });
                    }
                }
            });
        }
    });
}