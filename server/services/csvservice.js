var _ = require("underscore");
var binaryCSV = require("binary-csv");

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
      var areAllNumbers = _.every(types , function (type) {
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

module.exports = csvService;