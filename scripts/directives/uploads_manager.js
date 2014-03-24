(function() {
  angular.module('gunslinger').directive('uploadsManager', function($http, $timeout, $location, firebase, zencoder) {
    return {
      restrict: 'E',
      templateUrl: '../views/uploads_manager.html',
      link: function(scope) {
        var getUploadsForState, updateAllInWork, updateUploads;
        scope.uploads = firebase.getUploads();
        scope.uploads.$on('loaded', function() {
          return updateAllInWork();
        });
        getUploadsForState = function(collection, state) {
          var uploads;
          uploads = _.filter(collection, function(upload) {
            return (upload != null ? upload.state : void 0) === state;
          });
          return uploads;
        };
        updateUploads = function(uploads) {
          return _.each(uploads, function(upload) {
            return zencoder.getJobProgress(upload.id, upload.job_id);
          });
        };
        updateAllInWork = function(timeoutInterval) {
          var encoding, processing, videos, waiting;
          if (timeoutInterval == null) {
            timeoutInterval = 5000;
          }
          encoding = updateUploads(getUploadsForState(scope.uploads, 'encoding'));
          processing = updateUploads(getUploadsForState(scope.uploads, 'processing'));
          waiting = updateUploads(getUploadsForState(scope.uploads, 'waiting'));
          videos = _.union(encoding, processing, waiting);
          if (!_.isEmpty(videos)) {
            $timeout(function() {
              return videos = updateAllInWork();
            }, timeoutInterval);
          }
          return videos;
        };
        return scope.updateAllInWork = updateAllInWork;
      },
      controller: function($scope) {
        $scope.kickOffJob = function(videoId) {
          return $http.post("videos/" + videoId + "/publish").then(function(response) {
            return $scope.updateAllInWork();
          });
        };
        $scope.removeUpload = function(id) {
          return $http["delete"]("videos/" + id);
        };
        return $scope.watch = function(id, state) {
          if (state !== 'finished') {
            return;
          }
          return $location.path("/watch/" + id);
        };
      }
    };
  });

}).call(this);
