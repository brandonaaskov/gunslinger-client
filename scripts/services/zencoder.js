(function() {
  angular.module('gunslingr').service('zencoder', function($http) {
    return {
      getJobProgress: function(id, jobId) {
        return $http.post("videos/" + id + "/" + jobId + "/progress").then(function(response) {
          return response.data;
        });
      }
    };
  }).config(function($httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    return $httpProvider.defaults.headers.post['Zencoder-Api-Key'] = '';
  });

}).call(this);
