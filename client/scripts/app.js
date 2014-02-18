// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('gunslingr', ['ngRoute', 'firebase', 'ngAnimate', 'ngSanitize', 'ngCookies', 'mgcrea.ngStrap']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  }).run(function($cookies) {
    var guid, s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    guid = function() {
      return "" + (s4()) + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + (s4()) + (s4());
    };
    if (!$cookies.guid) {
      return $cookies.guid = guid();
    }
  });

}).call(this);
