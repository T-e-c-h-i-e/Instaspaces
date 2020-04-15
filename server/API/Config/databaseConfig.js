// var express = require('express');
var mysql = require('mysql');
config = {
  host: '52.220.159.54',
  port: '3306',
  user: 'instaspaces',
  password: 'insta@1000ccninja',
  database: 'easy3'
}
var connection = mysql.createConnection(config); //added the line
connection.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected Successfully!");
});
module.exports = {
  connection: mysql.createPool(config)
}