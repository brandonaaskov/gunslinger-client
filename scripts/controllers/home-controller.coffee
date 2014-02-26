angular.module('gunslinger').controller 'homeCtrl', ($scope, $cookies, firebase, $window, alerts, liveSync) ->
  firebase.users.$on 'loaded', (users) ->
    $scope.users = _.map users,(details) -> return details.basic
    console.log "$scope.users", $scope.users

  $scope.refreshUser = ->
    delete $cookies['guid']
    $window.location = "http://localhost:3000/"

  $scope.testAlert = -> alerts.dispatch('test')
  $scope.seekTo = "undetermined"

  $scope.getSeekTime = (startTime, videoLength) ->
    liveSync(startTime, videoLength).then (seekTo) ->
      $scope.seekTo = seekTo