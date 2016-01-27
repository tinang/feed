"use strict";

var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "$stateParams", "$filter", "feedService", "tweets"];
function feedCtrl($scope, $stateParams, $filter, feedService, tweets) {
	// find current hashtag and its data
  $scope.hashtag = $stateParams.hashtag ? $stateParams.hashtag : $scope.defaultHashtag;
  $scope.hashtagObj = $filter('filter')($scope.listHashtags, {'hashtag': $scope.hashtag})[0];

  // get tweets by hashtag
  $scope.tweets = tweets;
  console.log(tweets);
}

module.exports = {
  url: "/feed/:hashtag",
  templateUrl: "feed/list.html",
  controller: feedCtrl,
  resolve: {
    tweets: feed.getTweets
	}
};