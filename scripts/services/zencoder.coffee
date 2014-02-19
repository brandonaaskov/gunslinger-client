angular.module('gunslinger').service 'zencoder', ($http) ->
  getJobProgress: (id, jobId) -> $http.post("videos/#{id}/#{jobId}/progress").then (response) -> return response.data

.config ($httpProvider) ->
  $httpProvider.defaults.headers.common = {} # clears it out
  $httpProvider.defaults.headers.post = {} # clears it out
  $httpProvider.defaults.headers.post['Zencoder-Api-Key'] = ''