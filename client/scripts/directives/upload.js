(function() {
  angular.module('gunslingr').directive('upload', function($fileUploader, $location) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '../views/upload.html',
      link: function(scope) {
        var uploader;
        uploader = $fileUploader.create({
          url: "/videos",
          alias: 'video[file]',
          autoUpload: true
        });
        uploader.bind('completeall', function() {
          uploader.clearQueue();
          return $location.path('/uploads/manager');
        });
        return scope.uploader = uploader;
      }
    };
  });

}).call(this);
