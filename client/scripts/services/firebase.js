(function() {
  angular.module('gunslingr').service('firebase', function($firebase) {
    return {
      getUploads: function() {
        return $firebase(new Firebase('https://shining-fire-4877.firebaseio.com/uploads'));
      },
      getPlaylists: function() {
        return $firebase(new Firebase('https://shining-fire-4877.firebaseio.com/playlists'));
      }
    };
  });

}).call(this);
