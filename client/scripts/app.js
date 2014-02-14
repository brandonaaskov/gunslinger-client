(function() {
  angular.module('gunslingr', ['ui.router', 'angularFileUpload', 'firebase', 'ngSanitize']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    });
  });

}).call(this);
