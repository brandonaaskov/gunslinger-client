(function() {
  angular.module('gunslingr').service('firebase', function($firebase, $firebaseSimpleLogin, config) {
    return {
      auth: $firebaseSimpleLogin(new Firebase(config.firebase["default"])),
      playlists: $firebase(new Firebase(config.firebase.playlists)),
      uploads: $firebase(new Firebase(config.firebase.uploads)),
      users: $firebase(new Firebase(config.firebase.users))
    };
  });

}).call(this);
