describe 'gunslinger', ->

  module = null

  before ->
    module = angular.module('gunslinger')

  it 'should be registered', ->
    expect(module).not.to.equal(null)

  describe 'Dependencies', ->
    deps = undefined
    hasModule = (m) ->
      deps.indexOf(m) >= 0

    before ->
      deps = module.value('gunslinger').requires

    it 'should include Angular Route', ->
      expect(hasModule('ngRoute')).to.equal(true)

    it 'should include Angular Strap', ->
      expect(hasModule('mgcrea.ngStrap')).to.equal(true)

    it 'should include Firebase', ->
      expect(hasModule('firebase')).to.equal(true)

    it 'should include ngAnimate', ->
      expect(hasModule('ngAnimate')).to.equal(true)

    it 'should include ngSanitize', ->
      expect(hasModule('ngSanitize')).to.equal(true)

    it 'should include ngCookies', ->
      expect(hasModule('ngCookies')).to.equal(true)