
var config = require('../Config/databaseConfig.js');
var connection = config.connection;
module.exports.Popular = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    var sql = "SELECT * from WorkSpaceMapping";
    connection.query(sql, function(error, result) {
      if(error) {
          res.json({message: error});
      } else {
          res.send(result)
      }
    });
}
