angular.module('gunslinger').factory 'FirebaseCollection', (BaseCollection, BaseModel, $firebase, config, $q) ->
  return class FirebaseCollection extends BaseCollection
    model: BaseModel

    constructor: (models = [], url) ->
      if url then @url = url
      super(models)

    parse: (firebaseCollection) ->
      _(firebaseCollection).map  (value, key) ->
        value.id = key
        return value

    fetch: -> # DO NOT call super()
      @currentlyFetching = true
      deferred = $q.defer()
      reference = $firebase new Firebase(@url)
      reference.$on 'loaded', (firebaseCollection) =>
        collection = @parse(firebaseCollection)
        @add collection
        deferred.resolve(@models)

      reference.$on 'change', (keyChanged) =>
        console.log 'keyChanged', keyChanged

      return deferred.promise

      @currentlyFetching = false
      return reference