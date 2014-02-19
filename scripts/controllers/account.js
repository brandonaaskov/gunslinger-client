(function() {
  angular.module('gunslinger').controller('accountCtrl', function($scope, firebase) {
    $scope.user = firebase.user;
    $scope.auth = firebase.auth;
    $scope.login = firebase.login;
    return $scope.hasAccount = firebase.hasAccount;
  });

}).call(this);
