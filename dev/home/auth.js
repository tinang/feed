"use strict";

var noTokenSet = {
  data: {
    error: {
      message: "No token has been set"
    }
  },
  status: 401
};

var twitterApi = false;

AuthInterceptor.$inject = ["$window", "$q"];
function AuthInterceptor($window, $q) {
  OAuth.initialize('KqkVRr6ogHUio7LoO6UXZX-YcTs', { cache: true });
  // get twitter oauth
  OAuth.popup("twitter", {
      cache: true
    },
    function(error, result) {
      if (!error) {
        OAuth.create("twitter");
        return result;
      } else {
        return $q.reject(noTokenSet);
      }
  });
}

module.exports = AuthInterceptor;