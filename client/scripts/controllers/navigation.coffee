angular.module('gunslingr').controller 'navigationCtrl', ($scope, firebase) ->

  defaults =
    facebook:
      scope: 'email' # asking for much more is a terrible idea (unless you really need it)
      rememberMe: true
    github:
      scope: 'user:email'
      rememberMe: true
    twitter:
      rememberMe: true

  firebase.auth.$getCurrentUser().then (user) -> $scope.user = user

  $scope.login = (service) ->
    switch service
      when 'facebook'
        firebase.auth.$login('facebook', defaults.facebook).then (user) -> $scope.user = user
      when 'github'
        firebase.auth.$login('github', defaults.github).then (user) -> $scope.user = user
      when 'twitter'
        firebase.auth.$login('twitter', defaults.twitter).then (user) -> $scope.user = user

  $scope.logout = ->
    firebase.auth.$logout()
    $scope.user = null

  $scope.test = -> console.log 'test', arguments