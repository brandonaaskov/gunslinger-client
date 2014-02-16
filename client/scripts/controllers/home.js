(function() {
  angular.module('gunslingr').controller('homeCtrl', function($scope, firebase) {
    return $scope.uploads = firebase.uploads;
  });

}).call(this);
