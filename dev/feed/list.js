"use strict";

var feed = require('./service.js');

feedCtrl.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$filter", "feedService", "growl", "connectStatus"];
function feedCtrl($rootScope, $scope, $state, $stateParams, $filter, feedService, growl, connectStatus) {
	// find current hashtag and its data
  $scope.hashtag = $stateParams.hashtag ? $stateParams.hashtag : $scope.defaultHashtag;
  $scope.hashtagObj = $filter('filter')($scope.listHashtags, {'hashtag': $scope.hashtag})[0];

  $scope.tweets = [];
  $scope.latestId = null; // save latest tweetId will be max_id for the next query

  if( !connectStatus ) {
    growl.info('Connecting to Twitter API. Please allow popup to get oath.');
    //using the OAuth.io to get oauth to access twitter api
    feedService.initialize();
    feedService.connectTwitter().then(function() { // reload page after connected
      growl.success('Conected');
      $state.reload();
    });
  }

  // get tweets by hashtag
  $scope.loadTweets = function loadTweets() {
    $rootScope.loading = true; // overlay loading

    if ($scope.latestId) {
      $scope.latestId = parseInt($scope.latestId) - 1;
    }
    feedService.getTweetsByHashtag($scope.hashtag, { 'max_id': $scope.latestId }).then(
      function(data) {
        $rootScope.loading = false; // disable overlay loading

        var count = data.length;
        if (count) {
          // make random item is special for data
          var rand = Math.floor((Math.random() * count));
          data[rand].specialColor = '#'+Math.floor(Math.random()*16777215).toString(16);

          // the first time
          if ($scope.tweets.length === 0) {
            $scope.tweets = data;
          } else { // second and more...
            $scope.tweets = $scope.tweets.concat(data);
          }

          $scope.latestId = data[count - 1].id;
        } else {
          growl.warning('No data');
        }

        $scope.loading = false;
      }, function() {
        $rootScope.loading = false;
    });
  }

  // Init data for the first time
  $scope.loadTweets();
}

module.exports = {
  url: "/feed/:hashtag",
  templateUrl: "feed/list.html",
  controller: feedCtrl,
  resolve: {
    connectStatus: feed.connectStatus
  }
};