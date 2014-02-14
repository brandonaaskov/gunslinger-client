angular.module('gunslingr', [
  'ui.router'
  'angularFileUpload'
  'firebase'
  'ngSanitize'
  ])
  .config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state 'home',
        url: "/",
        templateUrl: "views/home.html"
        controller: "homeCtrl"