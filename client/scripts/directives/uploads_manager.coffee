angular.module('gunslingr').directive 'uploadsManager', ($http, $timeout, $location, firebase, zencoder) ->
  restrict: 'E'
  templateUrl: '../views/uploads_manager.html'
  link: (scope) ->
    scope.uploads = firebase.getUploads()
    scope.uploads.$on 'loaded', ->
      updateAllInWork()

    getUploadsForState = (collection, state) ->
      uploads = _.filter collection, (upload) -> upload?.state is state
      return uploads

    updateUploads = (uploads) ->
      _.each uploads, (upload) ->
        # firebase gets updated server-side
        zencoder.getJobProgress(upload.id, upload.job_id)

    updateAllInWork = (timeoutInterval = 5000) ->
      encoding = updateUploads getUploadsForState(scope.uploads, 'encoding')
      processing = updateUploads getUploadsForState(scope.uploads, 'processing')
      waiting = updateUploads getUploadsForState(scope.uploads, 'waiting')
      videos = _.union(encoding, processing, waiting)

      unless _.isEmpty(videos)
#        console.log 'videos to update', videos
        $timeout ->
          videos = updateAllInWork()
#          console.log 'videos after update', videos
        , timeoutInterval

      return videos

    scope.updateAllInWork = updateAllInWork

  controller: ($scope) ->
    $scope.kickOffJob = (videoId) -> $http.post("videos/#{videoId}/publish").then (response) ->
      $scope.updateAllInWork()

    $scope.removeUpload = (id) -> $http.delete("videos/#{id}")
    $scope.watch = (id, state) ->
      return unless state is 'finished'
      $location.path("/watch/#{id}")