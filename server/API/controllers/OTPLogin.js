const jwt = require('jsonwebtoken');
const totp = require('totp-generator');
const request = require("request");
module.exports.LoginOTP = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    console.log(req.body.mobile);
    jwt.verify(req.body.token, 'secretkey', function (err, decodedOtp) {
        if (err) {
            console.log('some issue');
            res.json({ status: 'expire' });
        } else {
            if (parseInt(req.body.otp) === parseInt(decodedOtp['data'])) {
                const email = req.body.mobile;
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
                            res.send({ status: 'success', token: token });
                        } else {
                            res.json({ status: 'unabletoken' });
                        }
                        // end------------------------------
                    }
                });
            } else {
                res.json({ status: 'failed' });
                // console.log('user not verified');
            }
        }
    }
    )
}