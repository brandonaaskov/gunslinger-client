(function() {
  angular.module('gunslinger').constant('config', {
    env: 'development',
    zencoder: {
      integration: '',
      read: '',
      full: ''
    },
    firebase: {
      "default": 'https://gunslinger.firebaseio.com',
      clock: 'https://gunslinger.firebaseio.com/.info/serverTimeOffset',
      uploads: 'https://gunslinger.firebaseio.com/uploads',
      users: 'https://gunslinger.firebaseio.com/users/basic',
      usersComplete: 'https://gunslinger.firebaseio.com/users/complete',
      auth: {
        facebook: {
          scope: 'user_birthday,friends_birthday',
          rememberMe: true
        },
        github: {
          scope: 'user:email',
          rememberMe: true
        },
        twitter: {
          rememberMe: true
        }
      }
    }
  });

}).call(this);
