angular.module('gunslingr', [
  'ngRoute'
  'ui.router'
  'angularFileUpload'
  'firebase'
  'ngSanitize'
  'mgcrea.ngStrap.modal'
  ])
  .config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state 'home',
        url: "/",
        templateUrl: "views/home.html"
        controller: "homeCtrl"