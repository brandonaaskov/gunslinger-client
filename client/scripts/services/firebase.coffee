angular.module('gunslingr').service 'firebase', ($firebase, $firebaseSimpleLogin, config) ->
  auth: $firebaseSimpleLogin new Firebase(config.firebase.default)
  playlists: $firebase new Firebase(config.firebase.playlists)
  uploads: $firebase new Firebase(config.firebase.uploads)
  users: $firebase new Firebase(config.firebase.users)
  user: (guid) ->
    console.log "#{config.firebase.users}/#{guid}"
    @users.$save(guid)
    $firebase new Firebase("#{config.firebase.users}/#{guid}")