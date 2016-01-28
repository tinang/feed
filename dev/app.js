"use strict";

require("angular");
require("ui-router");
require("angular-sanitize");
require("angular-bootstrap");
require("ng-twitter-api");

// registering and retrieving necessary modules
var mod = angular.module("mokusApp", ["ui.router", "ngSanitize", "ui.bootstrap", "ngTwitter"]);

// require all necessary states
// var auth = require("home/auth");
var home = require("home/home");
var feed = require("feed/list");

// Show/hide spinner icon when starting a new state
initLoader.$inject = ["$rootScope"];
function initLoader($rootScope) {
  $rootScope.$on("$stateChangeStart", function() {
    $rootScope.loading = true;
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState) {
    $rootScope.loading = false;
    $rootScope.currentState = toState;
  });

  $rootScope.$on("$stateChangeError", function() {
    $rootScope.loading = false;
  });
}

// List states
states.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
function states($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var defaultUrl = "/feed/programming"; // assuming that we are in default trend is #programming

  $urlRouterProvider.when("",  defaultUrl);
  $urlRouterProvider.when("/", defaultUrl);

  // home is root controller
  $stateProvider.state("root", home);
  $stateProvider.state("root.feed", feed);
  $urlRouterProvider.otherwise(defaultUrl);
}

// registerAuthInterceptor.$inject = ["$httpProvider"];
// function registerAuthInterceptor($httpProvider) {
//   $httpProvider.interceptors.push(auth);
// }
// mod.config(registerAuthInterceptor);

mod.config(states);
mod.run(initLoader);

// Utility functions for app (it should be put in helper lib instead of here)
mod.filter('displayHtml', ["$sce", function($sce) {
  return function(htmlString) {
    return $sce.trustAsHtml(htmlString);
  }
}]);