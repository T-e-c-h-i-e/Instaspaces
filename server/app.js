const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./API/routes/index.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);
app.use(cors());
// ------------------------------------------------------------------------

console.log('RESTful API server started on: ' + port);
app.listen(port)