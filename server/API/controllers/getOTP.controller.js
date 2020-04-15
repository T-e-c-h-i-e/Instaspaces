const jwt = require('jsonwebtoken');
var config = require('../Config/databaseConfig.js');
var connection = config.connection;
module.exports.getOTP = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    // console.log(req.body.mobile);
    jwt.verify(req.body.token, 'secretkey', function (err, decodedOtp) {
        if (err) {
            // console.log('some issue');
        } else {
            // console.log(req.body.otp);
            if (parseInt(req.body.otp) === parseInt(decodedOtp['data'])) {
                var mobile = req.body.mobile;
                var sql = "UPDATE customers set mverified='1' where mobile = ?";
                connection.query(sql, mobile, function (err, rows, field) {
                    if (err) throw err
                    // console.log(rows);
                    // console.log(field);
                });
                res.json({ status: 'success' });
            } else {
                res.json({ status: 'failed' });
                // console.log('user not verified');
            }
        }
    }
    )
}