angular.module('gunslinger').controller 'accountCtrl', ($scope, auth) ->
  $scope.user = auth.getCurrentUser()
  $scope.login = auth.login