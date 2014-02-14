describe 'gunslingr', ->

  module = null

  before ->
    module = angular.module('gunslingr')

  it 'should be registered', ->
    expect(module).not.to.equal(null)

  describe 'Dependencies', ->
    deps = undefined
    hasModule = (m) ->
      deps.indexOf(m) >= 0

    before ->
      deps = module.value('gunslingr').requires

    it 'should include angular-ui-router', ->
      expect(hasModule('ui.router')).to.equal(true)

    it 'should include angular-file-upload', ->
      expect(hasModule('angularFileUpload')).to.equal(true)

    it 'should include firebase', ->
      expect(hasModule('firebase')).to.equal(true)

  describe 'LoDash Mixins', ->
    it '_.removeExtension() should remove an extension given a proper filename', ->
