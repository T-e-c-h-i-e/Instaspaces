
// basic profile information for the user whose access token you provide.
const request = require("request");
const totp = require('totp-generator');
const config = require('../Config/databaseConfig.js');
const connection = config.connection;
const https = require('https');
module.exports.getEmailByLinkedIn = function (req, res) {
    // console.log(req.body.code);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    // const customerEmail = null;
    const redirect_uri = 'https://localhost/social-login';
    const code = req.body.code;
    const CLIENT_ID = '863bccwvjpz9y3';
    const CLIENT_SECRET = '3FbG4bL2EpGafUBF';
    const url = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&redirect_uri=' + redirect_uri + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&code=' + code;
    request.post(url, function (error, response, body) {
        if (error) {
            res.send({ code: error });
        } else {
            var accessToken = JSON.parse(response.body).access_token;
            const email = {
                host: 'api.linkedin.com',
                path: '/v2/emailAddress?q=members&projection=(elements*(handle~))',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'cache-control': 'no-cache',
                    'X-Restli-Protocol-Version': '2.0.0'
                }
            };
            const userEmailRequest = https.request(email, function (response) {
                var data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    var responseData = JSON.parse(data);
                    const email = responseData.elements[0]['handle~'].emailAddress;
                    const loginType = 'social';
                    const totpCode = totp('BP26TDZUZ5SVPZJRIHCAUVREO5EWMHHV'); // generating TOTP using key
                    // ---- TOTO-----
                    const url = 'https://www.instaspaces.in/NewWebLogin?RequestType=client&email=' + email + '&loginType=' + loginType + '&code=' + totpCode;
                    request.post(url, function (error, response) {
                        if (error) {
                            console.log(error); // issue in API calling
                        } else {
                            const message = JSON.parse(response.body).message; // response message 
                            const token = JSON.parse(response.body).token; // user token
                            // check email is registered or not -------------------
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
                            // end------------------------------
                        }
                    });
                    // ---- end
                });
            });
            userEmailRequest.end();
        };
    });
};
