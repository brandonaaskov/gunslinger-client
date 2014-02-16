angular.module('gunslingr').service 'firebase', ($firebase, config) ->
  getUploads: -> $firebase new Firebase(config.firebase.uploads)
  getPlaylists: -> $firebase new Firebase(config.firebase.playlists)

  login: (service, options = {}) ->
    pointer = new Firebase(config.firebase.default)
    auth = new FirebaseSimpleLogin(pointer)

    facebookDefaults =
      rememberMe: true
      scope: 'email,read_friendlists'

    options = _.defaults(facebookDefaults, options)
    auth.login service, options