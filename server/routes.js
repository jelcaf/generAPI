var index = require("./routes/index");

module.exports = function (app) {
  app.get('/', index.index);
};