const totp = require('totp-generator');
const request = require("request");
module.exports.Totp = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    const email = 'mdirfan844@gmail.com';
    const loginType = 'social';
    const token = totp('BP26TDZUZ5SVPZJRIHCAUVREO5EWMHHV');
    // console.log(token);
    const url = 'https://www.instaspaces.in/NewWebLogin?RequestType=client&email='+email+'&loginType='+loginType + '&code=' + token;
    request.post(url, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(response);
        }
    });
}