angular.module('gunslingr', [
  'ngRoute'
  'firebase'
  'ngSanitize'
  'ngAnimate'
  'mgcrea.ngStrap'
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: "views/home.html"
        controller: "homeCtrl"

      .otherwise
        redirectTo: '/'