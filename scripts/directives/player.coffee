angular.module('gunslinger').directive 'player', ->
  restrict: 'E'
  replace: false
  templateUrl: '../views/player.html'
  scope:
    video: '='
    playlist: '='
  link: (scope) ->
    videojs('player').ready ->
      return unless !scope.player
      scope.player = @

      @.on 'ended', ->
        nextVideo = _.at(scope.playlist, scope.video.id)
        console.log 'nextvideo', nextVideo

  controller: ($scope) ->
    $scope.$watch 'playlist', (playlist) ->
      console.log 'playlist', playlist
      $scope.video = getPlaybackVideo(playlist[$scope.video?.id])

    $scope.$watch 'video', (video) ->
      $scope.video = getPlaybackVideo($scope?.playlist[video?.id]) unless video