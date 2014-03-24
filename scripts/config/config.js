(function() {
  angular.module('gunslinger').constant('config', {
    zencoder: {
      integration: '',
      read: '',
      full: ''
    },
    firebase: {
      "default": 'https://gunslinger.firebaseio.com/',
      uploads: 'https://gunslinger.firebaseio.com/uploads',
      playlists: 'https://gunslinger.firebaseio.com/playlists',
      users: 'https://gunslinger.firebaseio.com/users'
    }
  });

}).call(this);
