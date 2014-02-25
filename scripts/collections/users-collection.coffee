angular.module('gunslinger').factory 'UsersCollection', (FirebaseCollection, $firebase, config, UserModel) ->
  return class UsersCollection extends FirebaseCollection
    model: UserModel
    url: config.firebase.users

    constructor: (models, url) ->
      super models, url
      @fetch()