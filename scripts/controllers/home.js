// Generated by CoffeeScript 1.6.3
(function() {
  angular.module('gunslinger').controller('homeCtrl', function($scope, UsersCollection, $cookies, $window, firebase) {
    firebase.auth.$getCurrentUser().then(function(user) {
      return $scope.currentUser = user;
    });
    $scope.users = new UsersCollection();
    $scope.$watch('users', function(users) {
      console.log('asdfasfsdf', users);
      return _(users).each(function(user) {
        return console.log('user', user);
      });
    });
    $scope.refreshUser = function() {
      delete $cookies['guid'];
      return $window.location = "http://localhost:3000/";
    };
    return firebase.getServerTime().then(function(offset) {
      return console.log('offset is', offset);
    });
  });

}).call(this);
