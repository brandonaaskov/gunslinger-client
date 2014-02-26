(function() {
  angular.module('gunslinger', ['ngRoute', 'ngSanitize', 'ngCookies', 'firebase', 'ngAnimate', 'mgcrea.ngStrap', 'fs.collections']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
