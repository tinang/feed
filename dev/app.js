"use strict";

require("angular");
require("ui-router");
require("angular-sanitize");
require("angular-bootstrap");
require("angular-growl");

// registering and retrieving necessary modules
var mod = angular.module("mokusApp", ["ui.router", "ngSanitize", "ui.bootstrap", "angular-growl"]);

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
  $locationProvider.html5Mode(false);

  var defaultUrl = "/feed?hashtag"; // assuming that we are in default trend is #programming

  $urlRouterProvider.when('/feed?hashtag', '/feed/:hashtag');
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

configGrowlMsg.$inject = ["growlProvider"];
function configGrowlMsg(growlProvider) {
  growlProvider.globalDisableCountDown(true)
               .globalTimeToLive({success: 2000, error: 5000, warning: 5000, info: 3000});;
}

mod.config(states);
mod.run(initLoader);
mod.config(configGrowlMsg);

// Utility functions for app (it should be put in helper lib instead of here)
mod.filter('displayHtml', ["$sce", function($sce) {
  return function(htmlString) {
    return $sce.trustAsHtml(htmlString);
  }
}]);