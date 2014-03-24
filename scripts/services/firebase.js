// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('gunslinger').service('firebase', function($firebase, $cookies, config, $rootScope, $q) {
    var clock, getServerTime;
    clock = new Firebase(config.firebase.clock);
    getServerTime = function() {
      var deferred;
      deferred = $q.defer();
      clock.on('value', function(snap) {
        var offset;
        offset = Date.now() + snap.val();
        return deferred.resolve(offset);
      });
      return deferred.promise;
    };
    return {
      users: $firebase(new Firebase(config.firebase.users)),
      getServerTime: getServerTime
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
