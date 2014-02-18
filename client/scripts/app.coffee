angular.module('gunslingr', [
  'ngRoute'
  'firebase'
  'ngSanitize'
  ])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: "views/home.html"
        controller: "homeCtrl"

      .otherwise
        redirectTo: '/'