(function() {
  angular.module('gunslinger').constant('config', function() {
    return {
      zencoder: {
        integration: '',
        read: '',
        full: ''
      },
      firebase: {
        "default": ''
      }
    };
  });

}).call(this);
