angular.module('gunslinger').filter 'user', ->
  user =
    name: undefined
    email: undefined
    imageUrl: undefined
    location: undefined
    gender: undefined
    profileUrl: undefined

  processGithubUser = (data) ->
    user.name = data.name
    user.email = data.email
    user.imageUrl = data.avatar_url
    user.profileUrl = data.profileUrl

  processFacebookUser = (data) ->
    user.name = "#{data.first_name} #{data.last_name}"
    user.email = data.email
    user.imageUrl = "http://graph.facebook.com/#{data.id}/picture"
    user.profileUrl = data.profileUrl

  processTwitterUser = (data) ->
    user.name = data.displayName
    user.email = data.email
    user.imageUrl = data.profile_image_url

  return (data, provider) ->
    switch provider
      when 'github' then processGithubUser(data)
      when 'facebook' then processFacebookUser(data)
      when 'twitter' then return processTwitterUser(user)
    return user