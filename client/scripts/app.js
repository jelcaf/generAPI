(function () {
  "use strict";

  var app = angular.module("generAPI", ['ui.bootstrap']);
  app.directive('fileSelect', function(){
    return {
        link: function($scope,el){
      		el.bind("change", function(e){
        		$scope.file = (e.srcElement || e.target).files[0];
        		$scope.getFile();
      		})   
    	}
    };
  });
}());

$('input[type="file"]').inputfile({
    uploadText: '<span class="glyphicon glyphicon-upload"></span> Select a CSV File',
    removeText: '<span class="glyphicon glyphicon-trash"></span>',
    restoreText: '<span class="glyphicon glyphicon-remove"></span>',

    uploadButtonClass: 'btn btn-primary',
    removeButtonClass: 'btn btn-default'
});

var UploadController = function ($scope, fileReader) {
     console.log(fileReader)
     $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsText($scope.file, $scope)
                  .then(function(result) {
                     processCSV(result);
                  });
     };
};

var processCSV = function(csv){
	// TODO: Send CSV to Server and get respond with a possible API structure.
	console.log(csv);
}
