"use strict";

var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "$stateParams", "$filter", "feedService", "tweets"];
function feedCtrl($scope, $stateParams, $filter, feedService, tweets) {
	// find current hashtag and its data
  $scope.hashtag = $stateParams.hashtag ? $stateParams.hashtag : $scope.defaultHashtag;
  $scope.hashtagObj = $filter('filter')($scope.listHashtags, {'hashtag': $scope.hashtag})[0];

  // get tweets by hashtag
  $scope.tweets = tweets;
  console.log('Feed: ', tweets);

  $scope.tweets = []; //array of tweets

  feedService.initialize();

  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  feedService.getLatestTweets(10).then(function(data) {
    console.log(data);
  }, function() {
    console.log('error');
  });
}

module.exports = {
  url: "/feed/:hashtag",
  templateUrl: "feed/list.html",
  controller: feedCtrl,
  resolve: {
    tweets: feed.getTweets
	}
};