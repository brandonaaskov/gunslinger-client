angular.module('gunslinger').service 'firebase', ($firebase, $cookies, config, $rootScope, $q) ->
  clock = new Firebase(config.firebase.clock)

  getServerTime = ->
    deferred = $q.defer()
    clock.on 'value', (snap) ->
      offset = Date.now() + snap.val()
      deferred.resolve(offset)
    return deferred.promise

  return {
    users: $firebase new Firebase(config.firebase.users)
    uploads: $firebase new Firebase(config.firebase.uploads)
    getServerTime: getServerTime
  }

.run ($cookies) ->
    # sets a unique guid so we can track users under one object (since they can login via many services)
    s4 = -> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
    unless $cookies.guid then $cookies.guid = guid()