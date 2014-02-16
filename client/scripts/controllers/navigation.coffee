angular.module('gunslingr').controller 'navigationCtrl', ($scope, firebase) ->

  defaults =
    facebook:
      scope: 'email' # asking for much more is a terrible idea (unless you really need it)
      rememberMe: false
    github:
      scope: 'user:email'
      rememberMe: false
    twitter:
      rememberMe: false

  $scope.login = (service) ->
    switch service
      when 'facebook' then firebase.login.$login('facebook', defaults.facebook)
      when 'github' then firebase.login.$login('github', defaults.github)
      when 'twitter' then firebase.login.$login('twitter', defaults.twitter)