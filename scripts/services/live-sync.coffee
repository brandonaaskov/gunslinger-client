angular.module('gunslinger').service 'liveSync', (firebase, $q) ->
    return (startTime, videoLength) ->
      deferred = $q.defer()

      firebase.getServerTime().then (now) ->
        startTime = parseInt startTime, 10
        lengthInMilliseconds = videoLength * 60 * 1000 # in ms
        seek = (now - startTime) % lengthInMilliseconds
        minutes = seek/1000/60
        deferred.resolve minutes

      return deferred.promise