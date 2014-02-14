angular.module('gunslingr').controller 'playlistBuilderCtrl', ($scope, $http, firebase) ->
  getUrlByExtension = (files, extension) ->
    matched = _.filter files, (file) ->
      extensionMatched = file.indexOf(".#{extension}") > -1
      serverMatched = file.indexOf("s3.amazonaws.com/published/") > -1
      return extensionMatched and serverMatched
    return _.first(matched)

  getPlaybackVideo = (upload) ->
    urls = _.pluck(upload.outputs, 'url')
    video =
      files: [
        { type: 'video/mp4', src: getUrlByExtension(urls, 'mp4') }
        { type: 'video/webm', src: getUrlByExtension(urls, 'webm') }
      ]
      name: upload.filename
      id: upload.id
      job_id: upload.job_id

    return video

  $scope.uploads = firebase.getUploads()
  $scope.playlists = firebase.getPlaylists()

  $scope.uploads.$on 'loaded', -> $scope.videos = _.where $scope.uploads, {'state': 'finished'}

  $scope.select = (upload) ->
    $scope.uploads[upload.id].selected = true
    upload.selected = true
    $scope.playlists.$save getPlaybackVideo(upload)

  $scope.unselect = (upload) ->
    $scope.uploads[upload.id].selected = false
    upload.selected = false
    $scope.playlists.$remove(upload.id)
    upload.removed = true