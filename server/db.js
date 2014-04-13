var mongoose = require("mongoose");
var config = require("./config");

var connected = false;

function connect (cb) {
  if (connected) {
    cb();
  }

  mongoose.connect(config["db.connection"]);
  var db = mongoose.connection;
  db.once("open", function () {
    connected = true;
    cb();
  });
}

function close () {
  mongoose.connection.close();
}

exports.connect = connect;
exports.close = close;