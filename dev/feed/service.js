"use strict";

function responseData(resp) {
  return resp.data;
}

feedService.$inject = ["$http"];
function feedService($http) {
  return {
    query: function(opts) {
      return $http({
        method: "GET",
        url: "",
        params: opts
      }).then(responseData);
    }
  }
}

angular.module('mokusApp')
  .factory('feedService', feedService);

queryFeeds.$inject = ["feedService", "$stateParams"];
function queryFeeds(feedService, $stateParams) {
  return feedService.query($stateParams.feedType, {
          feedType: $stateParams.feedType
  });
}

module.exports = {
  query: queryFeeds
}