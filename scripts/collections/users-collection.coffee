angular.module('gunslinger').factory 'UsersCollection', (FirebaseCollection, UserModel, config) ->
  return class UsersCollection extends FirebaseCollection
    model: UserModel
    url: config.firebase.users

    constructor: (models, url) ->
      super models, url
      @fetch()