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
    return $httpProvider.defaults.headers.post['Zencoder-Api-Key'] = 'f265337401dad65bb13d729400c30f2b';
  });

}).call(this);
