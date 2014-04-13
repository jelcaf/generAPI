var fs = require("fs");
var expect = require("chai").expect;
var csvService = require("../../services/csvService");
var db = require("../../db");
var ApiStructure = require("../../models/ApiStructure");

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

  describe("import", function () {
    before(db.connect);
    after(db.close);

    beforeEach(function (done) {
      ApiStructure.remove(done);
    });

    it("should create an ApiStructure", function (done) {
      var stream = fs.createReadStream(dataPath + "/import1.csv");
      var structure = {
        name: "test",
        fields: [
          {name: "c1", type: "string"},
          {name: "c2", type: "string" }
        ]
      };

      csvService.import(structure, stream, {}, function () {
        //todo assertions
        done();
      });


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