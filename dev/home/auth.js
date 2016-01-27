"use strict";

// var twitterKey = 'STORAGE.TWITTER.KEY';
// var clientId = 'O8EbM93iRY7cEffowYDRL7KCM';
// var clientSecret = 'NjjeWr9BoHkbOGhEjKUSwNJ2UpzeX6cjyW5wC7LVsFZfZMODai';
// var tokens = {};
//     tokens.ConsumerKey = "O8EbM93iRY7cEffowYDRL7KCM";
//     tokens.ConsumerSecret = "NjjeWr9BoHkbOGhEjKUSwNJ2UpzeX6cjyW5wC7LVsFZfZMODai";
//     tokens.AccessToken = "18350055-RLe98E8gLxyZpdqCnqQfzbn8ce6hwF2odQrfMGepc";
//     tokens.AccessTokenSecret = "xp0g7CeWIDrZHjJCsZtJpdu6oXkuf8fMlrAIePZtkgVb5";

// AuthInterceptor.$inject = ["$window", "$q", "$twitterApi"];
// function AuthInterceptor($window, $q, $twitterApi) {
//   $twitterApi.configure(clientId, clientSecret, tokens);
// }

// module.exports = AuthInterceptor;


angular.module('twitterApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('KqkVRr6ogHUio7LoO6UXZX-YcTs', {
                cache: true
            });
            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function(maxId) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var url = '/1.1/statuses/home_timeline.json';
            if (maxId) {
                url += '?max_id=' + maxId;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                // when the data is retrieved resolve the deferred object
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    }
});