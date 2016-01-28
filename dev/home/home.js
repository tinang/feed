"use strict";

var feed = require('feed/service.js');

// This is main controller, main state for all states
homeCtrl.$inject = ["$scope", "feedService", "listHashtags"];
function homeCtrl($scope, feedService, listHashtags) {
  // Get list hashtags and theirs info
  $scope.listHashtags = listHashtags;
  // Set default hashtag is first item in list
  $scope.defaultHashtag = $scope.listHashtags[0].hashtag || '';
}

module.exports = {
  url: "",
  templateUrl: "home/home.html",
  controller: homeCtrl,
  resolve: {
    listHashtags: feed.getHashtags
  }
};