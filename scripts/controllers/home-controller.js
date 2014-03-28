(function() {
  angular.module('gunslinger').controller('homeCtrl', function($scope, $cookies, firebase, $window, liveSync) {
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
    $scope.alerts = [
      {
        type: 'danger',
        message: 'this is a bright boy alert! repeat! a bright boy alert!'
      }, {
        type: 'success',
        message: 'success!'
      }, {
        type: 'info',
        message: 'info'
      }, {
        type: 'warning',
        message: 'warning'
      }
    ];
    return $scope.closeAlert = function(index) {
      return $scope.alerts.splice(index, 1);
    };
  });

}).call(this);
