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

.run ($cookies) ->
  # sets a unique guid so we can track users under one object (since they can login via many services)
  s4 = -> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring 1
  guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
  unless $cookies.guid then $cookies.guid = guid()