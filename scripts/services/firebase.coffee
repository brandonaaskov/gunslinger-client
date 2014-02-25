angular.module('gunslinger').service 'firebase', ($firebase, $firebaseSimpleLogin, $cookies, config, $rootScope, $q) ->
  auth = $firebaseSimpleLogin new Firebase(config.firebase.default)
  users = $firebase new Firebase(config.firebase.users)
  user = $firebase new Firebase("#{config.firebase.users}/#{$cookies.guid}")
  clock = new Firebase(config.firebase.clock)

  hasAccount = (user) ->
    return unless user
    return _.has(user, 'github') or _.has(user, 'facebook') or _.has(user, 'twitter')

  login = (service) ->
    switch service
      when 'facebook'
        auth.$login('facebook', defaults.facebook).then (user) ->
          updateUser(user)
      when 'github'
        auth.$login('github', defaults.github).then (user) ->
          updateUser(user)
      when 'twitter'
        auth.$login('twitter', defaults.twitter).then (user) ->
          updateUser(user)

  defaults =
    facebook:
      scope: 'user_birthday,friends_birthday' # asking for much more is a terrible idea (unless you really need it)
      rememberMe: true
    github:
      scope: 'user:email'
      rememberMe: true
    twitter:
      rememberMe: true

  updateUser = (providerDetails) ->
    user[providerDetails.provider] = providerDetails
    user.$save()
    $rootScope.$broadcast "userChanged", user

  getServerTime = ->
    deferred = $q.defer()
    clock.on 'value', (snap) ->
      offset = Date.now() + snap.val()
      deferred.resolve(offset)
    return deferred.promise

  return {
    auth: auth
    users: users
    user: user
    hasAccount: hasAccount
    login: login
    getServerTime: getServerTime
  }

.run ($cookies) ->
    # sets a unique guid so we can track users under one object (since they can login via many services)
    s4 = -> Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    guid = -> "#{s4()}#{s4()}-#{s4()}-#{s4()}-#{s4()}-#{s4()}#{s4()}#{s4()}"
    unless $cookies.guid then $cookies.guid = guid()