angular.module('gunslinger').controller 'accountCtrl', ($scope, auth) ->
  auth.getCurrentUser().then (user) ->
    $scope.currentUser = user

  $scope.login = auth.login