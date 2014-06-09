'use strict';

var app = angular.module("generAPI", [
  'ngRoute',
  'ui.bootstrap',
  'generAPI.directives',
  'generAPI.controllers'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/tableProposal', {
      templateUrl: 'table_proposal',
      controller: 'TableProposal'
    }).
    otherwise({
      templateUrl: "Fail"
    });

    $locationProvider.html5Mode(true);
});


