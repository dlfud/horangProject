const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "horang",
});

module.exports = connection;
