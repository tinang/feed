"use strict";

function responseData(resp) {
  return resp.data;
}

feedService.$inject = ["$http", "$twitterApi", "$q"];
function feedService($http, $twitterApi, $q) {
  var authorizationResult = false;

  return {
    initialize: function() {
      //initialize OAuth.io with public key of the application
      OAuth.initialize('KqkVRr6ogHUio7LoO6UXZX-YcTs', {
          cache: false
      });
      //try to create an authorization result when the page loads,
      // this means a returning user won't have to click the twitter button again
      authorizationResult = OAuth.create("twitter");
    },
    isReady: function() {
      return (authorizationResult);
    },
    getLatestTweets: function(maxId) {
      //create a deferred object using Angular's $q service
      var deferred = $q.defer();
      var url = '/1.1/statuses/home_timeline.json';
      if (maxId) {
          url += '?max_id=' + maxId;
      }
      var promise = authorizationResult.get(url).done(function(data) {
        // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
        // when the data is retrieved resolve the deferred object
        deferred.resolve(data);
      }).fail(function(err) {
        deferred.reject(err);
      });

      //return the promise of the deferred object
      return deferred.promise;
    },
    // Get list hashtags from dummy data
    getHashtags: function() {
      return $http({
        method: "GET",
        url: "dummy/hashtags.json"
      }).then(responseData);
    },
    // get tweets by specific hashtag
    getTweetsByHashtag: function(hashtag) {
      console.log('Param: ', hashtag);
      // $twitterApi.configure(clientId, clientSecret, oauthToken);
      // $twitterApi.searchTweets(hashtag, {count: 6}).then(responseData);
    }
  }
}

angular.module('mokusApp')
  .factory('feedService', feedService);

queryHashtags.$inject = ["feedService"];
function queryHashtags(feedService) {
  return feedService.getHashtags();
}

queryTweetsByHashtag.$inject = ["$stateParams", "feedService"];
function queryTweetsByHashtag($stateParams, feedService) {
  return feedService.getTweetsByHashtag($stateParams.hashtag);
}

module.exports = {
  getHashtags: queryHashtags,
  getTweets: queryTweetsByHashtag
}