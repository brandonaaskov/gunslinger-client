angular.module('gunslingr').service 'firebase', ($firebase, config) ->
  getUploads: -> $firebase new Firebase(config.firebase.uploads)
  getPlaylists: -> $firebase new Firebase(config.firebase.playlists)