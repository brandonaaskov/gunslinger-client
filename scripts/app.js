(function() {
  angular.module('gunslinger', ['ui.router', 'ngSanitize', 'ngCookies', 'firebase', 'ngAnimate', 'fs.collections', 'ui.bootstrap']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    return $stateProvider.state('/', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    });
  });

}).call(this);
