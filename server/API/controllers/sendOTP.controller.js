const jwt = require('jsonwebtoken');
const accountSid = "ACd34cb7f9dd6f70beec3fae93efc14ae0";
const authToken = "1668c9e8c23c11145d2f589b8b00c397";
const client = require('twilio')(accountSid, authToken);
module.exports.SendOTP = function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    const mobile = '+91' + req.body.mobile;
    const otp = Math.floor(1000 + Math.random() * 9000);
    // console.log(otp);
    const token = jwt.sign({
        data: otp
      }, 'secretkey', { expiresIn: 60*15 });
    client.messages.create({
        to: mobile,
        from: "+14702227226",
        body: 'Hi ' + otp + ' is your verification code for InstaSpaces. Please use this to verify your mobile.'
    })
    res.json({ token: token });
};