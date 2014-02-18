// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('gunslingr').controller('navigationCtrl', function($scope, firebase) {
    var defaults;
    defaults = {
      facebook: {
        scope: 'email',
        rememberMe: true
      },
      github: {
        scope: 'user:email',
        rememberMe: true
      },
      twitter: {
        rememberMe: true
      }
    };
    $scope.aside = {
      title: "Account Crap",
      animation: 'am-fadeAndSlideLeft',
      template: 'views/aside-login.html',
      placement: 'right',
      backdrop: true
    };
    firebase.auth.$getCurrentUser().then(function(user) {
      console.log('user', user);
      return $scope.user = user;
    });
    $scope.login = function(service) {
      switch (service) {
        case 'facebook':
          return firebase.auth.$login('facebook', defaults.facebook).then(function(user) {
            return $scope.user = user;
          });
        case 'github':
          return firebase.auth.$login('github', defaults.github).then(function(user) {
            return $scope.user = user;
          });
        case 'twitter':
          return firebase.auth.$login('twitter', defaults.twitter).then(function(user) {
            return $scope.user = user;
          });
      }
    };
    return $scope.logout = function() {
      firebase.auth.$logout();
      return $scope.user = null;
    };
  });

}).call(this);
