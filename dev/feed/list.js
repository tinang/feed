"use strict";
var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "growl", "$stateParams", "$state"];
function feedCtrl($scope, growl, $stateParams, $state) {
  
}

module.exports = {
  url:         "/customers/:customerId/displays?page",
  templateUrl: "display/list.html",
  controller:  feedCtrl,
  resolve:     {
    
  }
};