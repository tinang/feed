"use strict";

function responseData(resp) {
  return resp.data;
}

feedService.$inject = ["$http", "$q"];
function feedService($http, $q) {
  var twitterApi = false;

  return {
    initialize: function() {
      //initialize OAuth.io with public key of the application
      OAuth.initialize('KqkVRr6ogHUio7LoO6UXZX-YcTs', { cache: true });
      //try to create an authorization result when the page loads,
      // this means a returning user won't have to click the twitter button again
      twitterApi = OAuth.create("twitter");
    },
    isReady: function() {
      return (twitterApi);
    },
    connectTwitter: function() {
      var deferred = $q.defer();
      OAuth.popup("twitter", {
        cache: true
      }, function(error, result) {
          // cache means to execute the callback if the tokens are already present
          if (!error) {
            twitterApi = result;
            deferred.resolve();
          } else {
              //do something if there's an error

            }
          });
      return deferred.promise;
    },
    // get tweets by specific hashtag
    getTweetsByHashtag: function(hashtag) {
      var deferred = $q.defer();
      var url = '/1.1/search/tweets.json?q=%23' + hashtag;

      var promise = twitterApi.get(url).done(function(data) {
        deferred.resolve(data.statuses);
      }).fail(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    },
    // Get list hashtags from dummy data
    getHashtags: function() {
      return $http({
        method: "GET",
        url: "dummy/hashtags.json"
      }).then(responseData);
    }
  }
}

angular.module('mokusApp')
  .factory('feedService', feedService);

queryHashtags.$inject = ["feedService"];
function queryHashtags(feedService) {
  return feedService.getHashtags();
}

module.exports = {
  getHashtags: queryHashtags
}