angular.module('gunslingr').service 'zencoder', ($http) ->
  getJobProgress: (id, jobId) -> $http.post("videos/#{id}/#{jobId}/progress").then (response) -> return response.data

.config ($httpProvider) ->
  $httpProvider.defaults.headers.common = {} # clears it out
  $httpProvider.defaults.headers.post = {} # clears it out
  $httpProvider.defaults.headers.post['Zencoder-Api-Key'] = 'f265337401dad65bb13d729400c30f2b'