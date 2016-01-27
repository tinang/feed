"use strict";

var twitterKey = 'STORAGE.TWITTER.KEY';
var clientId = 'O8EbM93iRY7cEffowYDRL7KCM';
var clientSecret = 'NjjeWr9BoHkbOGhEjKUSwNJ2UpzeX6cjyW5wC7LVsFZfZMODai';
var tokens = {};
    tokens.ConsumerKey = "O8EbM93iRY7cEffowYDRL7KCM";
    tokens.ConsumerSecret = "NjjeWr9BoHkbOGhEjKUSwNJ2UpzeX6cjyW5wC7LVsFZfZMODai";
    tokens.AccessToken = "18350055-RLe98E8gLxyZpdqCnqQfzbn8ce6hwF2odQrfMGepc";
    tokens.AccessTokenSecret = "xp0g7CeWIDrZHjJCsZtJpdu6oXkuf8fMlrAIePZtkgVb5";

AuthInterceptor.$inject = ["$window", "$q", "$twitterApi"];
function AuthInterceptor($window, $q, $twitterApi) {
  $twitterApi.configure(clientId, clientSecret, tokens);
}

module.exports = AuthInterceptor;
