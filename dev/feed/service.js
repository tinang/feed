"use strict";

function responseData(resp) {
  return resp.data;
}

feedService.$inject = ["$http", "$twitterApi"];
function feedService($http, $twitterApi) {
  return {
    // Get list hashtags from dummy data
    getHashtags: function() {
      return $http({
        method: "GET",
        url: "dummy/hashtags.json"
      }).then(responseData);
    },
    // get tweets by specific hashtag
    getTweetsByHashtag: function(hashtag) {
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