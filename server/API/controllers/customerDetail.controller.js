
var config = require('../Config/databaseConfig.js');
var connection = config.connection;
module.exports.customer = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var user = req.body.userName;
    // console.log(user)
    var a = user.indexOf('@');
    // connection.query("delete  from customers where email = 'cdac.irfan18@gmail.com'", function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    // });
    if (a === -1) {
        var sql = "SELECT id, uname, email, mobile, mverified from customers  WHERE  mobile = ?";
    } else {
        var sql = "SELECT id, uname, email, mobile, mverified from customers  WHERE  email = ?";
        // console.log('email');
    }
    // var sql = "SELECT id, uname, email, mobile, mverified from customers  where mobile = 9836372183";
    connection.query(sql, user, function (error, results) {
        // console.log(error);
        if (error) {
            res.status(400).send('Error in database operation');
        } else {
            // console.log(results);
            res.send(results);
            // console.log(results);
        }
    });
}
