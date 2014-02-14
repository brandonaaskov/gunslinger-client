(function() {
  angular.module('gunslingr').controller('playlistPlayerCtrl', function($scope, firebase) {
    var uploads;
    uploads = firebase.getUploads();
    uploads.$on('loaded', function() {
      return $scope.videos = _.where(uploads, {
        state: 'finished',
        selected: true
      });
    });
    return $scope.play = function(video) {
      console.log('i want to play these video files', video);
      return $scope.currentVideo = video;
    };
  });

}).call(this);
