(function() {
  describe('gunslinger', function() {
    var module;
    module = null;
    before(function() {
      return module = angular.module('gunslinger');
    });
    it('should be registered', function() {
      return expect(module).not.to.equal(null);
    });
    return describe('Dependencies', function() {
      var deps, hasModule;
      deps = void 0;
      hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        return deps = module.value('gunslinger').requires;
      });
      it('should include Angular Route', function() {
        return expect(hasModule('ngRoute')).to.equal(true);
      });
      it('should include Angular Strap', function() {
        return expect(hasModule('mgcrea.ngStrap')).to.equal(true);
      });
      it('should include Firebase', function() {
        return expect(hasModule('firebase')).to.equal(true);
      });
      it('should include ngAnimate', function() {
        return expect(hasModule('ngAnimate')).to.equal(true);
      });
      it('should include ngSanitize', function() {
        return expect(hasModule('ngSanitize')).to.equal(true);
      });
      return it('should include ngCookies', function() {
        return expect(hasModule('ngCookies')).to.equal(true);
      });
    });
  });

}).call(this);
