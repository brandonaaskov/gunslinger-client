angular.module('gunslinger', [
  'ngRoute'
  'firebase'
  'ngAnimate'
  'ngSanitize'
  'ngCookies'
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

.run (alerts, $alert, $rootScope, $interpolate) ->

    _(alerts).each (alertEvent) ->
      $rootScope.$on "#{alertEvent.name}", (event, payload) ->
        options =
          container: alertEvent.container
          placement: alertEvent.placement
          type: alertEvent.type
          duration: alertEvent.duration
          title: alertEvent.title
          content: $interpolate(alertEvent.content)(payload)

        $alert(options)