// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('gunslinger', ['ngRoute', 'ngSanitize', 'ngCookies', 'firebase', 'mgcrea.ngStrap', 'fs.collections']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);