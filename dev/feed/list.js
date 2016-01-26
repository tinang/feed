"use strict";
var feed = require('./service.js');

feedCtrl.$inject = ["$scope", "growl", "$stateParams", "$state"];
function feedCtrl($scope, growl, $stateParams, $state) {
  
}

module.exports = {
  url: 				"/feed/:hashtag",
  views: 			{
						    'feed': {
						      templateUrl: "feed/list.html"
						    },
						    'top-nav': {
						      templateUrl: "static/top-nav.html"
						    },
						    'content': {
						    	templateUrl: "static/block-content.html"
						    }
	},
  controller: feedCtrl,
  resolve:    {
    
	}
};