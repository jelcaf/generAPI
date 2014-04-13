var _ = require("underscore");
var binaryCSV = require("binary-csv");
var ApiStructure = require("../models/ApiStructure");
var Api = require("../models/Api");

var DEFAULT_CSV_PARSE_OPTIONS = {
  separator: ",",
  newline: "\n",
  json: false
};

var csvService = {};

csvService.guestStructure = function (csvStream, csvParseOptions, cb) {
  csvParseOptions.limit = 3;
  readCsvByColumns(csvStream, csvParseOptions, function (err, columns) {
    if (err) {
      return cb(err);
    }

    var structure = {};
    structure.fields = columns.map(function (column, index) {
      var types = column.map(typeFromValue);
      var areAllNumbers = _.every(types, function (type) {
        return type === "number";
      });
      var columnType = areAllNumbers ? "number" : "string";
      return {type: columnType, index: index};
    });

    cb(null, structure);
  });
};

function readCsvByColumns (csvStream, csvParseOptions, cb) {
  csvParseOptions = _.extend(DEFAULT_CSV_PARSE_OPTIONS, csvParseOptions);
  var columns = [];
  var parser = binaryCSV(csvParseOptions);

  var currentRow = 0;
  parser.on("data", function (lineBuffer) {
    if (!_.isUndefined(csvParseOptions.limit) && csvParseOptions.limit === currentRow) {
      return parser.end();
    }

    var cells = parser.line(lineBuffer);

    if (currentRow === 0) {
      for (var i = 0; i < cells.length; i++) {
        columns.push([]);
      }
    }

    cells.forEach(function (cell, i) {
      var value = parser.cell(cell).toString();
      columns[i].push(value);
    });

    currentRow++;
  });
  parser.on("end", function () {
    cb(null, columns);
  });

  csvStream.pipe(parser);
}

function typeFromValue (value) {
  if (!_.isNaN(+value)) {
    return "number";
  }
  return "string";
}

csvService.import = function (structure, csvStream, csvParseOptions, cb) {
  var apiStructure = new ApiStructure(structure);
  apiStructure.save(function () {
    var Row = Api.getByApiStructure(apiStructure);

    csvParseOptions = _.extend(DEFAULT_CSV_PARSE_OPTIONS, csvParseOptions);
    var parser = binaryCSV(csvParseOptions);

    var fieldsNames = _.pluck(apiStructure.fields, "name");
    parser.on("data", function (lineBuffer) {
      parser.pause();

      var cells = parser.line(lineBuffer);
      for (var i = 0; i < cells.length; i++) {
        cells[i] = parser.cell(cells[i]).toString();
      }
      var rowData = zip(fieldsNames, cells);

      console.log(rowData);
      var row = new Row(rowData);
      row.save(function (err) {
        console.log("insert err", err);
        parser.resume();
      });
    });

    parser.on("end", function () {
      Row.find(function (err, rows) {
        console.log(rows);
      });

      cb(null);
    });
    csvStream.pipe(parser);
  });
};

function zip (headers, cells) {
  var obj = {};
  for (var i = 0; i < headers.length; i++) {
    obj[headers[i]] = cells[i];
  }
  return obj;
}

module.exports = csvService;