(function() {
  angular.module('gunslinger').directive('player', function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: '../views/player.html',
      scope: {
        video: '=',
        playlist: '='
      },
      link: function(scope) {
        return videojs('player').ready(function() {
          if (!!scope.player) {
            return;
          }
          scope.player = this;
          return this.on('ended', function() {
            var nextVideo;
            nextVideo = _.at(scope.playlist, scope.video.id);
            return console.log('nextvideo', nextVideo);
          });
        });
      },
      controller: function($scope) {
        $scope.$watch('playlist', function(playlist) {
          var _ref;
          console.log('playlist', playlist);
          return $scope.video = getPlaybackVideo(playlist[(_ref = $scope.video) != null ? _ref.id : void 0]);
        });
        return $scope.$watch('video', function(video) {
          if (!video) {
            return $scope.video = getPlaybackVideo($scope != null ? $scope.playlist[video != null ? video.id : void 0] : void 0);
          }
        });
      }
    };
  });

}).call(this);
