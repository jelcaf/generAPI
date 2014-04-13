var _ = require("underscore");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var apis = {};

function getByApiStructure (apiStructure) {
  if (!apis[apiStructure.name]) {
    apis[apiStructure.name] = createModel(apiStructure);
  }
  return apis[apiStructure.name];
}

function createModel (apiStructure) {
  var schemaOptions = {};
  _.each(apiStructure.fields, function (field) {
    var type = field.type === "number" ? Number : String;
    schemaOptions[field.name] = type;
  });
  var schema = new Schema(schemaOptions);
  var model = mongoose.model("api_" + apiStructure.name, schema);
  return model;
}

exports.getByApiStructure = getByApiStructure;