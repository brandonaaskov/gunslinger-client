(function() {
  angular.module('gunslinger').controller('homeCtrl', function($scope, $cookies, firebase, $window, alerts, liveSync) {
    firebase.users.$on('loaded', function(users) {
      $scope.users = _.map(users, function(details) {
        return details.basic;
      });
      return console.log("$scope.users", $scope.users);
    });
    $scope.refreshUser = function() {
      delete $cookies['guid'];
      return $window.location = "http://localhost:3000/";
    };
    $scope.testAlert = function() {
      return alerts.dispatch('test');
    };
    $scope.seekTo = "undetermined";
    return $scope.getSeekTime = function(startTime, videoLength) {
      return liveSync(startTime, videoLength).then(function(seekTo) {
        return $scope.seekTo = seekTo;
      });
    };
  });

}).call(this);
