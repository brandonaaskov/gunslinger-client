angular.module('gunslinger').controller 'homeCtrl', ($scope, $cookies, firebase, $window, liveSync) ->
  firebase.users.$on 'loaded', (users) ->
    $scope.users = _.map users,(details) -> return details.basic
    console.log "$scope.users", $scope.users

  $scope.refreshUser = ->
    delete $cookies['guid']
    $window.location = "http://localhost:3000/"

  $scope.alerts = [
    type: 'danger'
    message: 'this is a bright boy alert! repeat! a bright boy alert!'
  ,
    type: 'success'
    message: 'success!'
  ,
    type: 'info'
    message: 'info'
  ,
    type: 'warning'
    message: 'warning'
  ]

  $scope.closeAlert = (index) -> $scope.alerts.splice index, 1