app = angular.module('fs.collections')

app.factory 'BaseCollection', ($http, BaseModel) ->
  class BaseCollection
    currentlyFetching: false

    constructor: (models, opts) ->
      @[key] = value for key, value of opts
      @models = []
      @length = 0
      @add models

    url: ->

    model: BaseModel

    parse: (res) -> res.data

    fetch: (options) ->
      defaults =
        method: 'GET'
        url: _(@).result('url')

      options = _.extend(defaults, options)
      options.params = _.extend({}, options.params) if options.params
      options.data   = _.extend({}, options.data) if options.data

      @currentlyFetching = true
      $http(options).then(_.bind(@parse, @)).then (models) =>
        @add(models)
        @currentlyFetching = false
        @

    eq: (index) -> @models?[index]

    get: (id) ->
      _(@models).findWhere id: id

    remove: (models) ->
      isSingular = ! _(models).isArray()
      models = [models] if isSingular

      _(models).forEach (model) =>
        index = @indexOf(model)
        @models.splice index, 1
        @length--

      if isSingular then models[0] else models

    add: (models, options) ->
      return unless models
      options = _.extend({sort: true}, options)
      isSingular = ! _(models).isArray()
      models =  if isSingular then [models] else models.slice()
      added = []

      models.forEach (model) =>
        model = @_prepareModel(model)

        added.push(model)
        @length++
        @models.push(model)

      @sort() if options.sort

      return if isSingular then added[0] else added

    create: (attrs) ->
      instance = @add(attrs)
      instance.save() if instance

    reset: ->
      @models = []
      @length = 0
      @

    sort: ->
      if @comparator then @models.sort(@comparator)
      else @models.sort (a, b) -> a.id - b.id

    _prepareModel: (attrs) ->
      if attrs instanceof @model
        model = attrs
        model.collection = @
      else
        model = new @model(attrs, collection: @)
      return model

    pluck: (attr) ->
      _.invoke(@models, 'get', attr)

  # From the Backbone source: https://github.com/jashkenas/backbone/blob/master/backbone.js#L942
  # Underscore methods that we want to implement on the Collection.
  # 90% of the core usefulness of Backbone Collections is actually implemented
  # right here:
  methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain']

  # Mix in each Underscore method as a proxy to `Collection#models`.
  _.each methods, (method) ->
    BaseCollection::[method] = (args...) ->
      args.unshift @models
      _[method].apply(_, args)

  # Underscore methods that take a property name as an argument.
  attributeMethods = ['groupBy', 'countBy', 'sortBy']

  # Use attributes instead of properties.
  _.each attributeMethods, (method) ->
    BaseCollection::[method] = (value, context) ->
      iterator = if _.isFunction value then value else (model) -> model.get(value)
      return _[method](@models, iterator, context)

  return BaseCollection
