(function() {
  angular.module('gunslingr').controller('homeCtrl', function($scope, firebase) {
    $scope.uploads = firebase.getUploads();
    return $scope.login = firebase.login;
  });

}).call(this);
