var _ = require("underscore");

var configurations = {
  base : {
    port: 3000,
    "db.connection" : "mongodb://localhost/generapi"
  },
  test : {
    port: 3001,
    "db.connection" : "mongodb://localhost/generapi-test"
  }
};

var env = process.env.NODE_ENV;
var config = configurations.base;
if (configurations[env]) {
  _.extend(config, configurations[env]);
}

module.exports = config;