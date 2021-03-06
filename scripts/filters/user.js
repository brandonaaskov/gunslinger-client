(function() {
  angular.module('gunslinger').filter('user', function() {
    var processFacebookUser, processGithubUser, processTwitterUser, user;
    user = {
      name: void 0,
      email: void 0,
      imageUrl: void 0,
      location: void 0,
      gender: void 0,
      profileUrl: void 0
    };
    processGithubUser = function(data) {
      user.name = data.name;
      user.email = data.email;
      user.imageUrl = _.first(data.avatar_url.split('?')) + '.png';
      return user.profileUrl = data.profileUrl;
    };
    processFacebookUser = function(data) {
      user.name = "" + data.first_name + " " + data.last_name;
      user.email = data.email;
      user.imageUrl = "http://graph.facebook.com/" + data.id + "/picture?.png";
      return user.profileUrl = data.profileUrl;
    };
    processTwitterUser = function(data) {
      user.name = data.displayName;
      user.email = data.email;
      return user.imageUrl = data.profile_image_url;
    };
    return function(data, provider) {
      switch (provider) {
        case 'github':
          processGithubUser(data);
          break;
        case 'facebook':
          processFacebookUser(data);
          break;
        case 'twitter':
          return processTwitterUser(user);
      }
      return user;
    };
  });

}).call(this);
