(function() {
  angular.module('gunslinger', ['ngRoute', 'firebase', 'ngAnimate', 'ngSanitize', 'ngCookies', 'mgcrea.ngStrap', 'fs.collections']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: "views/home.html",
      controller: "homeCtrl"
    }).otherwise({
      redirectTo: '/'
    });
  }).run(function(alerts, $alert, $rootScope, $interpolate) {
    return _(alerts).each(function(alertEvent) {
      return $rootScope.$on("" + alertEvent.name, function(event, payload) {
        var options;
        options = {
          container: alertEvent.container,
          placement: alertEvent.placement,
          type: alertEvent.type,
          duration: alertEvent.duration,
          title: alertEvent.title,
          content: $interpolate(alertEvent.content)(payload)
        };
        return $alert(options);
      });
    });
  });

}).call(this);
