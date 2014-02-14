angular.module('gunslingr').controller 'playlistPlayerCtrl', ($scope, firebase) ->
  uploads = firebase.getUploads()
  uploads.$on 'loaded', ->
    $scope.videos = _.where uploads, {state: 'finished', selected: true}

  $scope.play = (video) ->
    console.log 'i want to play these video files', video
    $scope.currentVideo = video