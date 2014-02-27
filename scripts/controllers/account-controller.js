(function() {
  angular.module('gunslinger').controller('accountCtrl', function($scope, auth) {
    auth.getCurrentUser().then(function(user) {
      return $scope.currentUser = user;
    });
    return $scope.login = auth.login;
  });

}).call(this);
