"use strict";

angular.module("generAPI.controllers", ['ui.bootstrap'])
  .controller('UploadController', function ($scope, $location, fileReader) {
     $scope.getFile = function () {
        fileReader.readAsText($scope.file, $scope)
                  .then(function(result) {
                     processCSV($location, result);
                  });
     };
  })
  .controller("TableProposal", function ($scope){
     $scope.message = "Hola";
     console.log("pepe");
  });


var processCSV = function($location, csv){
	// TODO: Send CSV to Server and get respond with a possible API structure.
	console.log(csv);
  document.getElementById("continue-index").style.display = "inline-block";
  //$location.path('/table_proposal');
  
}
