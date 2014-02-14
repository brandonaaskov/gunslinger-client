angular.module('gunslingr').service 'firebase', ($firebase) ->
  getUploads: -> $firebase new Firebase('https://shining-fire-4877.firebaseio.com/uploads')
  getPlaylists: -> $firebase new Firebase('https://shining-fire-4877.firebaseio.com/playlists')