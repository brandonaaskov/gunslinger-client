angular.module('gunslingr', [
  'ngRoute'
  'firebase'
  'ngAnimate'
  'ngSanitize'
  'ngCookies'
  'mgcrea.ngStrap'
  ])
.config ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: "views/home.html"
      controller: "homeCtrl"

    .otherwise
      redirectTo: '/'