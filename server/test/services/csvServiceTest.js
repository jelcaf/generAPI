var fs = require("fs");
var expect = require("chai").expect;
var csvService = require("../../services/csvService");

var dataPath = __dirname + "/../data";

describe("csvService", function () {

  describe("guestStructure", function () {
    it("should guest column type", function (done) {
      var expectedStructure = {
        fields: [
          { type: "string", index: 0 },
          { type: "number", index: 1 },
          { type: "string", index: 2 }
        ]
      };
      testFileStructureEquals("guestStructure1.csv", expectedStructure, done);
    });
  });

  function testFileStructureEquals (file, expectedStructure, cb) {
    var stream = fs.createReadStream(dataPath + "/" + file);
    csvService.guestStructure(stream, {}, function (err, structure) {
      expect(structure).to.eql(expectedStructure);
      cb();
    });
  }

});