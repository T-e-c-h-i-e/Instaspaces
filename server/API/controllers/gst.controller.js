var config = require('../Config/databaseConfig.js');
var connection = config.connection;
// Get Request for GST------------------------------------------------------------------------------
module.exports.getGST = function (req, res) {
    // table = "GSTdetails";
    // console.log('get API call')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var userid = req.query.userid;
    // var sql = "DELETE from GSTdetails where userid = ?";
    var sql = "SELECT * from GSTdetails where userid = ?";
    connection.query(sql, userid, function (error, results) {
        if (error) {
            res.status(400).send('Error in database operation');
        } else {
            // console.log(results)
            if (results.length == 0 || results.length == undefined) {
                res.send('0');
            } else if (results.length == 1) {
                res.send('1');
            }
        }
    });
}
// Post Request for GST----------------------------------------------------------------
module.exports.postGST = function (req, res) {
    // table = "GSTdetails";
    // console.log('Insert API call')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var userid = req.body.userid;
    var GSTIN = req.body.GSTIN;
    var company = req.body.company;
    var addemail = req.body.addemail;
    var address = req.body.address;
    var date = (new Date()).toISOString().slice(0, 19).replace("T", " ");
    var sql = "INSERT INTO GSTdetails (userid, GSTIN, company, addemail, address, timestamp) VALUES(?,?,?,?,?,?)";
    connection.query(sql, [userid, GSTIN, company, addemail, address, date], function (error, result) {
        if (error) {
            res.status(400).send('Error in database operation');
        } else {
            console.log('Record Inserted');
            res.send(result);
        }
    });
}
// update GST-------------------------------------------------------
module.exports.updateGST = function (req, res) {
    // table = "GSTdetails";
    // console.log('update API Call');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var userid = req.body.userid;
    var GSTIN = req.body.GSTIN;
    var company = req.body.company;
    var addemail = req.body.addemail;
    var address = req.body.address;
    var date = (new Date()).toISOString().slice(0, 19).replace("T", " ");
    var sql = "UPDATE GSTdetails SET GSTIN = ?, company = ?, addemail = ?, address = ?, timestamp = ? WHERE userid = ?";
    connection.query(sql, [GSTIN, company, addemail, address, date, userid], function (error, result) {
        if (error) {
            res.status(400).send('Error in database operation');
        } else {
            console.log('Records Updated');
            res.send(result);
        }
    });
}