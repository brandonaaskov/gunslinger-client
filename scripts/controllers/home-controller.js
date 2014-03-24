(function() {
  angular.module('gunslinger').controller('homeCtrl', function($scope, $cookies, firebase, $window) {
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
    firebase.getServerTime().then(function(offset) {
      return console.log('offset is', offset);
    });
    return $scope.alerts = [
      {
        type: 'danger',
        message: 'this is a bright boy alert! repeat! a bright boy alert!'
      }
    ];
  });

}).call(this);
