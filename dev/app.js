"use strict";

require("angular");
require("ui-router");
require("angular-sanitize");
require("angular-bootstrap");
require("ng-twitter-api");

// registering and retrieving necessary modules
var mod = angular.module("mokusApp", ["ui.router", "ngSanitize", "ui.bootstrap", "ngTwitter"]);

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

  $urlRouterProvider.when("",  "/feed"); // assuming that we are in default trend is #programming
  $urlRouterProvider.when("/", "/feed");

  // home is root controller
  $stateProvider.state("root", home);
  $stateProvider.state("root.feed", feed);
}

mod.config(states);
mod.run(initLoader);