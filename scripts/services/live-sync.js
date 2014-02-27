(function() {
  angular.module('gunslinger').service('liveSync', function(firebase, $q) {
    return function(startTime, videoLength) {
      var deferred;
      deferred = $q.defer();
      firebase.getServerTime().then(function(now) {
        var lengthInMilliseconds, minutes, seek;
        startTime = parseInt(startTime, 10);
        lengthInMilliseconds = videoLength * 60 * 1000;
        seek = (now - startTime) % lengthInMilliseconds;
        minutes = seek / 1000 / 60;
        return deferred.resolve(minutes);
      });
      return deferred.promise;
    };
  });

}).call(this);
