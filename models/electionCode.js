const mysql = require("mysql");
var Schema = mysql.Schema;

var electioCodeSchema = new Schema({
  sgId: { type: Number, required: true },
  sgTypecode: { type: Number, required: true },
  sgName: { type: String, required: true },
  sgVotedate: { type: String, required: true },
});

module.exports = mysql.model("electioCode", electioCodeSchema);
