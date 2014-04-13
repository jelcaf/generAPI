var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var apiStructureSchema = new Schema({
  name: {type: String, index: { unique: true }},
  fields: [
    {
      name: String,
      index: Number,
      indexed: Boolean
    }
  ]
});

var ApiStructureSchema = mongoose.model("ApiStructure", apiStructureSchema);
module.exports = ApiStructureSchema;