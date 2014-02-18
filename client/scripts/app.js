(function() {
  angular.module('gunslingr', ['ngRoute', 'firebase', 'ngSanitize', 'ngAnimate', 'mgcrea.ngStrap']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
