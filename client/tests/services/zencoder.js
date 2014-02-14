(function() {
  describe('The Zencoder Service', function() {
    beforeEach(function() {
      module('gunslingr');
      return inject(function($injector) {
        return $injector = $injector;
      });
    });
    it("should contain the $http service", function() {
      return inject(function($http) {
        return expect($http).not.to.equal(null);
      });
    });
    return it("getJobProgress() makes a POST", inject(function(zencoder, $httpBackend) {
      $httpBackend.expectPOST('videos/upload-id/job-id/progress').respond();
      zencoder.getJobProgress('upload-id', 'job-id');
      return $httpBackend.flush();
    }));
  });

}).call(this);
