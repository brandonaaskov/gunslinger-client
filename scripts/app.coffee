angular.module('gunslinger', [
  'ui.router'
  'ngSanitize'
  'ngCookies'
  'firebase'
  'ngAnimate'
  'fs.collections'
  'ui.bootstrap'
  ])
.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise "/"

  $stateProvider.state '/',
    url: '/'
    templateUrl: 'views/home.html'
    controller: 'homeCtrl'