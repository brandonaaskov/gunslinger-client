angular.module('gunslingr').controller 'accountCtrl', ($scope, firebase) ->
  $scope.user = firebase.user
  $scope.auth = firebase.auth
  $scope.login = firebase.login
  $scope.hasAccount = firebase.hasAccount