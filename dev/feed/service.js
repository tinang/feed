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
          if (!error) {
            twitterApi = result;
            deferred.resolve();
          } else {
            console.log('Can not connect');
        }
      });

      return deferred.promise;
    },
    // get tweets by specific hashtag
    getTweetsByHashtag: function(hashtag, opts) {
      var _opts = {
        'count': 6,
        'include_entities': true,
        'result_type': 'mixed',
        'max_id': false
      };
      opts = angular.extend(_opts, opts);

      var deferred = $q.defer();
      var url = '/1.1/search/tweets.json' + '?q=%23' + hashtag;
      // loop param query
      angular.forEach(opts, function(value, key) {
        url += '&' + key + '=' + value;
      });

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

getConnectStatus.$inject = ["feedService"];
function getConnectStatus(feedService) {
  return feedService.isReady();
}

module.exports = {
  getHashtags: queryHashtags,
  connectStatus: getConnectStatus
}