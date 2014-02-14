(function() {
  angular.module('gunslingr').controller('playlistBuilderCtrl', function($scope, $http, firebase) {
    var getPlaybackVideo, getUrlByExtension;
    getUrlByExtension = function(files, extension) {
      var matched;
      matched = _.filter(files, function(file) {
        var extensionMatched, serverMatched;
        extensionMatched = file.indexOf("." + extension) > -1;
        serverMatched = file.indexOf("s3.amazonaws.com/published/") > -1;
        return extensionMatched && serverMatched;
      });
      return _.first(matched);
    };
    getPlaybackVideo = function(upload) {
      var urls, video;
      urls = _.pluck(upload.outputs, 'url');
      video = {
        files: [
          {
            type: 'video/mp4',
            src: getUrlByExtension(urls, 'mp4')
          }, {
            type: 'video/webm',
            src: getUrlByExtension(urls, 'webm')
          }
        ],
        name: upload.filename,
        id: upload.id,
        job_id: upload.job_id
      };
      return video;
    };
    $scope.uploads = firebase.getUploads();
    $scope.playlists = firebase.getPlaylists();
    $scope.uploads.$on('loaded', function() {
      return $scope.videos = _.where($scope.uploads, {
        'state': 'finished'
      });
    });
    $scope.select = function(upload) {
      $scope.uploads[upload.id].selected = true;
      upload.selected = true;
      return $scope.playlists.$save(getPlaybackVideo(upload));
    };
    return $scope.unselect = function(upload) {
      $scope.uploads[upload.id].selected = false;
      upload.selected = false;
      $scope.playlists.$remove(upload.id);
      return upload.removed = true;
    };
  });

}).call(this);
