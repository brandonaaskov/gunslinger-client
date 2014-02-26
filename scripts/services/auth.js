(function() {
  angular.module('gunslinger').service('auth', function($firebase, $firebaseSimpleLogin, $cookies, config, alerts) {
    var auth, hasAccount, login, updateBasic, updateComplete, updateUser, user;
    auth = $firebaseSimpleLogin(new Firebase(config.firebase["default"]));
    user = {
      complete: $firebase(new Firebase("" + config.firebase.users + "/complete/" + $cookies.guid)),
      basic: $firebase(new Firebase("" + config.firebase.users + "/basic/" + $cookies.guid))
    };
    login = function(service) {
      switch (service) {
        case 'facebook':
          return auth.$login('facebook', config.firebase.auth.facebook).then(function(providerDetails) {
            return updateUser(providerDetails);
          });
        case 'github':
          return auth.$login('github', config.firebase.auth.github).then(function(providerDetails) {
            return updateUser(providerDetails);
          });
        case 'twitter':
          return auth.$login('twitter', config.firebase.auth.twitter).then(function(providerDetails) {
            return updateUser(providerDetails);
          });
      }
    };
    hasAccount = function() {
      if (!user) {
        return false;
      }
      return _.has(user.complete, 'github') || _.has(user.complete, 'facebook') || _.has(user.complete, 'twitter');
    };
    updateUser = function(providerDetails) {
      updateComplete(providerDetails);
      updateBasic();
      return alerts.dispatch("userChanged", user.basic);
    };
    updateComplete = function(providerDetails) {
      user.complete[providerDetails.provider] = providerDetails;
      return user.complete.$save();
    };
    updateBasic = function() {
      var merged, _ref, _ref1, _ref2, _ref3;
      merged = _({}).defaults((_ref2 = user.complete) != null ? _ref2.twitter : void 0).defaults((_ref1 = user.complete) != null ? _ref1.facebook : void 0).defaults((_ref = user.complete) != null ? _ref.github : void 0).value();
      user.basic.guid = $cookies.guid;
      user.basic.name = merged != null ? merged.displayName : void 0;
      user.basic.email = merged != null ? merged.email : void 0;
      user.basic.imageUrl = merged != null ? merged.avatar_url : void 0;
      user.basic.location = _.isString(merged != null ? merged.location : void 0) ? merged != null ? merged.location : void 0 : (_ref3 = merged.location) != null ? _ref3.name : void 0;
      user.basic.gender = merged != null ? merged.gender : void 0;
      user.basic.profileUrl = merged != null ? merged.profileUrl : void 0;
      user.basic.github = _.has(user.complete, 'github');
      user.basic.facebook = _.has(user.complete, 'facebook');
      user.basic.twitter = _.has(user.complete, 'twitter');
      return user.basic.$save();
    };
    return {
      login: login,
      hasAccount: hasAccount,
      user: user.basic,
      getCurrentUser: function() {
        return auth.$getCurrentUser().then(function(user) {
          return user;
        });
      }
    };
  });

}).call(this);
