describe 'The Zencoder Service', ->

  beforeEach ->
    module('gunslingr')
    inject ($injector) -> $injector = $injector

  it "should contain the $http service", ->
    inject ($http) ->
      expect($http).not.to.equal(null)

  it "getJobProgress() makes a POST", inject (zencoder, $httpBackend) ->
    $httpBackend.expectPOST('videos/upload-id/job-id/progress').respond()
    zencoder.getJobProgress('upload-id', 'job-id')
    $httpBackend.flush()