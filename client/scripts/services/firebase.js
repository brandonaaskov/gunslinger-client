(function() {
  angular.module('gunslingr').service('firebase', function($firebase, config) {
    return {
      getUploads: function() {
        return $firebase(new Firebase(config.firebase.uploads));
      },
      getPlaylists: function() {
        return $firebase(new Firebase(config.firebase.playlists));
      },
      login: function(service, options) {
        var auth, facebookDefaults, pointer;
        if (options == null) {
          options = {};
        }
        pointer = new Firebase(config.firebase["default"]);
        auth = new FirebaseSimpleLogin(pointer);
        facebookDefaults = {
          rememberMe: true,
          scope: 'email,read_friendlists'
        };
        options = _.defaults(facebookDefaults, options);
        return auth.login(service, options);
      }
    };
  });

}).call(this);
