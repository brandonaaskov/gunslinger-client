angular.module('gunslinger', [
  'ngRoute'
  'ngSanitize'
  'ngCookies'
  'firebase'
  'ngAnimate'
  'mgcrea.ngStrap'
  'fs.collections'
  ])
.config ($routeProvider) ->
  $routeProvider
    .when '/',
        templateUrl: "views/home.html"
        controller: "homeCtrl"

    .otherwise
        redirectTo: '/'