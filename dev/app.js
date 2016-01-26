"use strict";

require("angular");
require("ui-router");
require("angular-sanitize");
require("angular-bootstrap");

var mod = angular.module("mokusApp", ["ui.router", "ngSanitize", "ui.bootstrap"]);

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

}

mod.config(states);
mod.run(initLoader);