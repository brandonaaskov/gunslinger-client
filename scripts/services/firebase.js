(function() {
  angular.module('gunslinger').service('firebase', function($firebase, $firebaseSimpleLogin, $cookies, config) {
    var auth, defaults, hasAccount, login, updateUser, user, users;
    auth = $firebaseSimpleLogin(new Firebase(config.firebase["default"]));
    users = $firebase(new Firebase(config.firebase.users));
    user = $firebase(new Firebase("" + config.firebase.users + "/" + $cookies.guid));
    hasAccount = function(user) {
      if (!user) {
        return;
      }
      return _.has(user, 'github') || _.has(user, 'facebook') || _.has(user, 'twitter');
    };
    login = function(service) {
      switch (service) {
        case 'facebook':
          return auth.$login('facebook', defaults.facebook).then(function(user) {
            return updateUser(user);
          });
        case 'github':
          return auth.$login('github', defaults.github).then(function(user) {
            return updateUser(user);
          });
        case 'twitter':
          return auth.$login('twitter', defaults.twitter).then(function(user) {
            return updateUser(user);
          });
      }
    };
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
    updateUser = function(providerDetails) {
      user[providerDetails.provider] = providerDetails;
      return user.$save();
    };
    return {
      auth: auth,
      users: users,
      user: user,
      hasAccount: hasAccount,
      login: login
    };
  }).run(function($cookies) {
    var guid, s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    guid = function() {
      return "" + (s4()) + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + "-" + (s4()) + (s4()) + (s4());
    };
    if (!$cookies.guid) {
      return $cookies.guid = guid();
    }
  });

}).call(this);
