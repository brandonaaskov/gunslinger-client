app = angular.module('fs.collections')

app.factory 'BaseModel', ($http) ->
  class BaseModel
    parse: (res) -> res.data

    _hasIdAttribute: (attrs) ->
      _(Object.keys(attrs)).contains(@idAttribute)?

    constructor: (attrs = {}, opts = {}) ->
      @attributes = {}
      @attributes[key] = value for key, value of attrs
      @[key] = value for key, value of opts
      @id = attrs[@idAttribute] if @_hasIdAttribute(attrs)

    has: (key) -> @attributes[key]?

    get: (key) -> @attributes[key]

    set: (key, val) ->
      unless key then return @

      if typeof key is 'object'
        attrs = key
      else
        attrs = {}
        attrs[key] = val

      @id = attrs[@idAttribute] if @_hasIdAttribute(attrs)
      @attributes[aKey] = aVal for aKey, aVal of attrs
      @

    urlRoot: ''

    idAttribute: 'id'

    isNew: -> if @id? then false else true

    url: (method) ->
      base = _.result(@, 'urlRoot') or _.result(@collection, 'url')
      if @isNew()
        base
      else
        base + if base.charAt(base.length - 1) is '/' then '' else '/' + encodeURIComponent(@id)

    toJSON: ->
      _.clone(@attributes)

    fetch: (opts = {}) ->
      _(opts).defaults
        method: 'GET'
        url: @url('read')
      $http(opts).then(_(@parse).bind(@)).then(_(@set).bind(@))

    save: (opts = {}) ->
      _(opts).defaults
        method: if @isNew() then 'POST' else 'PUT'
        url: @url(if @isNew() then 'create' else 'update')
        data: @toJSON()
      $http(opts).then(_(@parse).bind(@)).then(_(@set).bind(@))

    destroy: (opts = {}) ->
      if @collection then @collection.remove(@)
      unless @isNew()
        _(opts).defaults
          method: 'DELETE'
          url: @url('delete')
        $http(opts).then(_(@parse).bind(@))


  # From Backbone source: https://github.com/jashkenas/backbone/blob/master/backbone.js#L571
  # Underscore methods that we want to implement on the Model.
  modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit']

  # Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each modelMethods, (method) ->
    BaseModel::[method] = (args...) ->
      args.unshift @attributes
      _[method].apply(_, args)

  return BaseModel
