(function() {
  angular.module('gunslinger').controller('accountCtrl', function($scope, auth) {
    $scope.user = auth.getCurrentUser();
    return $scope.login = auth.login;
  });

}).call(this);