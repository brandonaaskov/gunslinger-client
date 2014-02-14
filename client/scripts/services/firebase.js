(function() {
  angular.module('gunslingr').service('firebase', function($firebase, config) {
    return {
      getUploads: function() {
        return $firebase(new Firebase(config.firebase.uploads));
      },
      getPlaylists: function() {
        return $firebase(new Firebase(config.firebase.playlists));
      }
    };
  });

}).call(this);
