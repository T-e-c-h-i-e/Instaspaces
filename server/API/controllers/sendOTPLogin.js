const config = require('../Config/databaseConfig.js');
const connection = config.connection;
const jwt = require('jsonwebtoken');
const accountSid = "ACd34cb7f9dd6f70beec3fae93efc14ae0";
const authToken = "1668c9e8c23c11145d2f589b8b00c397";
const client = require('twilio')(accountSid, authToken);
module.exports.SendLoginOTP = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    const mobile = req.body.mobile;
    console.log(mobile)
    const sql = "SELECT mobile from customers  WHERE  mobile = ?";
    connection.query(sql, mobile, function (error, results) {
        // console.log(error);
        if (error) {
            res.status(400).send('Error in database operation');
        } else {
            if (results.length === 1) {
                const mobile = '+91' + req.body.mobile;
                const otp = Math.floor(1000 + Math.random() * 9000);
                console.log(otp)
                // console.log(otp);
                // const token = jwt.sign({
                //     // 1 hour expiration
                //     exp: Math.floor(Date.now() / 1000) + (60 * 15),
                //     data: otp
                // }, 'secret');
                const token = jwt.sign({
                    data: otp
                  }, 'secretkey');
                client.messages.create({
                    to: mobile,
                    from: "+14702227226",
                    body: 'Hi ' + otp + ' is your verification code for InstaSpaces. Please use this to verify your mobile.'
                })
                res.json({ token: token, message: 1 });
            } else {
                res.json({message: 0});
            }
        }
    });
};