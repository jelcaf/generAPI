var index = require("./routes/index");

module.exports = function (app) {
  app.get("/", index.index);
  app.get("/table_proposal", index.table);
};