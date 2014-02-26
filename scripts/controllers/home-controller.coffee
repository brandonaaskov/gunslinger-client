angular.module('gunslinger').controller 'homeCtrl', ($scope, $cookies, firebase, $window, alerts) ->
  firebase.users.$on 'loaded', (users) ->
    $scope.users = _.map users,(details) -> return details.basic
    console.log "$scope.users", $scope.users

  $scope.refreshUser = ->
    delete $cookies['guid']
    $window.location = "http://localhost:3000/"

  firebase.getServerTime().then (offset) ->
    console.log 'offset is', offset

  $scope.testAlert = -> alerts.dispatch('test')