(function() {
  angular.module('gunslinger').controller('homeCtrl', function($scope, firebase) {
    return $scope.uploads = firebase.uploads;
  });

}).call(this);
