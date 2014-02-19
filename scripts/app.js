(function() {
  angular.module('gunslinger', ['ngRoute', 'firebase', 'ngAnimate', 'ngSanitize', 'ngCookies', 'mgcrea.ngStrap']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
