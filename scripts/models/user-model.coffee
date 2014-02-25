angular.module('gunslinger').factory 'UserModel', (BaseModel) ->
    class UserModel extends BaseModel
      guid: undefined
      email: undefined
      name: undefined
      imageUrl: undefined
      location: undefined
      gender: undefined
      profileUrl: undefined

      github: undefined
      facebook: undefined
      twitter: undefined

      constructor: (firebaseUser) ->
        @guid = firebaseUser?.id
        @github = firebaseUser?.github
        @facebook = firebaseUser?.facebook
        @twitter = firebaseUser?.twitter

        # merges whatever login info we have and makes some common values from them
        merged = _(@twitter).defaults(@facebook).defaults(@github).value()
        @merged = merged
        @name = merged?.displayName
        @imageUrl = merged?.avatar_url
        @location = merged?.location
        @gender = merged?.gender
        @profileUrl = merged?.profileUrl

#      processGithubUser = (data) ->
#        return unless data
#        user.name = data.name
#        user.email = data.email
#        user.imageUrl = _.first(data.avatar_url.split('?')) + '.png'
#        user.profileUrl = data.profileUrl
#
#      processFacebookUser = (data) ->
#        return unless data
#        user.name = "#{data.first_name} #{data.last_name}"
#        user.email = data.email
#        user.imageUrl = "http://graph.facebook.com/#{data.id}/picture?.png"
#        user.profileUrl = data.profileUrl
#
#      processTwitterUser = (data) ->
#        return unless data
#        user.name = data.displayName
#        user.email = data.email
#        user.imageUrl = data.profile_image_url