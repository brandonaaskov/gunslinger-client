angular.module('gunslinger').factory 'UserModel', (BaseModel) ->
    class UserModel extends BaseModel
      guid: undefined
      email: undefined
      name: undefined
      imageUrl: undefined
      location: undefined
      gender: undefined
      profileUrl: undefined

      constructor: (firebaseUser) ->
        @guid = firebaseUser?.id
        @email = firebaseUser.basic?.email
        @name = firebaseUser.basic?.name
        @imageUrl = firebaseUser.basic?.imageUrl
        @location = firebaseUser.basic?.location
        @gender = firebaseUser.basic?.gender
        @profileUrl = firebaseUser.basic?.profileUrl