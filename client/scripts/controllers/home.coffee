angular.module('gunslingr').controller 'homeCtrl', ($scope, firebase) ->
  $scope.uploads = firebase.getUploads()
  $scope.login = firebase.login