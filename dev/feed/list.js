"use strict";

var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "$stateParams", "$filter", "feedService"];
function feedCtrl($scope, $stateParams, $filter, feedService) {
	// find current hashtag and its data
  $scope.hashtag = $stateParams.hashtag ? $stateParams.hashtag : $scope.defaultHashtag;
  $scope.hashtagObj = $filter('filter')($scope.listHashtags, {'hashtag': $scope.hashtag})[0];

  // get tweets by hashtag
  $scope.tweets = [];

  if( !feedService.isReady() ) {
    feedService.initialize();
    feedService.connectTwitter();
  }

  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  feedService.getTweetsByHashtag($scope.hashtag).then(function(data) {
    $scope.tweets = data;
    console.log(data);
  });
}

module.exports = {
  url: "/feed/:hashtag",
  templateUrl: "feed/list.html",
  controller: feedCtrl
};