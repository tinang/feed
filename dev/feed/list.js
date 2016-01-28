"use strict";

var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "$stateParams", "$filter", "feedService", "growl"];
function feedCtrl($scope, $stateParams, $filter, feedService, growl) {
	// find current hashtag and its data
  $scope.hashtag = $stateParams.hashtag ? $stateParams.hashtag : $scope.defaultHashtag;
  $scope.hashtagObj = $filter('filter')($scope.listHashtags, {'hashtag': $scope.hashtag})[0];
  $scope.tweets = [];
  $scope.latestId = null; // save latest tweetId will be max_id for the next query
  $scope.loading = true;

  //using the OAuth.io to get oauth to access twitter api
  feedService.initialize();
  feedService.connectTwitter();

  // get tweets by hashtag
  $scope.loadTweets = function loadTweets() {
    if ($scope.latestId) {
      $scope.latestId = parseInt($scope.latestId) - 1;
    }
    feedService.getTweetsByHashtag($scope.hashtag, { 'max_id': $scope.latestId }).then(function(data) {
      var count = data.length;
      if (count) {
        if ($scope.tweets.length === 0) {
          $scope.tweets = data;
        } else {
          $scope.tweets = $scope.tweets.concat(data);
        }

        $scope.latestId = data[count - 1].id;
        console.log(typeof(data));
        console.log('New result: ', data);
      } else {
        growl.addErrorMessage('No data');
      }

      $scope.loading = false;
    });
  }

  // Init data for the first time
  $scope.loadTweets();
}

module.exports = {
  url: "/feed/:hashtag",
  templateUrl: "feed/list.html",
  controller: feedCtrl
};