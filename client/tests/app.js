(function() {
  describe('gunslingr', function() {
    var module;
    module = null;
    before(function() {
      return module = angular.module('gunslingr');
    });
    it('should be registered', function() {
      return expect(module).not.to.equal(null);
    });
    describe('Dependencies', function() {
      var deps, hasModule;
      deps = void 0;
      hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        return deps = module.value('gunslingr').requires;
      });
      it('should include angular-ui-router', function() {
        return expect(hasModule('ui.router')).to.equal(true);
      });
      it('should include angular-file-upload', function() {
        return expect(hasModule('angularFileUpload')).to.equal(true);
      });
      return it('should include firebase', function() {
        return expect(hasModule('firebase')).to.equal(true);
      });
    });
    return describe('LoDash Mixins', function() {
      return it('_.removeExtension() should remove an extension given a proper filename', function() {});
    });
  });

}).call(this);
