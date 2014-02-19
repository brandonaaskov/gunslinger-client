angular.module('gunslinger').controller 'homeCtrl', ($scope, firebase) ->
  $scope.uploads = firebase.uploads