angular.module('gunslingr').controller 'navigationCtrl', ($scope, firebase, $cookies) ->

  defaults =
    facebook:
      scope: 'email' # asking for much more is a terrible idea (unless you really need it)
      rememberMe: true
    github:
      scope: 'user:email'
      rememberMe: true
    twitter:
      rememberMe: true

  $scope.aside =
    title: "Account Crap"
    animation: 'am-fadeAndSlideLeft'
    template: 'views/aside-login.html'
    placement: 'right'
    backdrop: true

  getFacebookDetails = (user) ->
    name:
      first: user.first_name
      last: user.last_name
      display: user.displayName
      user: user.username
    email: user.email
    id: user.id
    url: user.profileUrl
    gender: user.gender
    pic: "http://graph.facebook.com/#{user.id}/picture"
#      pic: user.avatar_url
#      "CAAKHNlgQJ8wBACnssJF4F2vYK47qnFmNOtOpWfovNUjk6jv7l4ZCkNbuY7WX49bZCZAWgZB9y4lv40Uf3tQPlvUSgDpBQDjuFAsn5y9CuiQjbA4OBxjYABdXG2Eb46WrvBxPcz0bpKaUKgZAoVqQthwVdLAqDlVQctZBIDfkyMXtYr345Es0sGe3FzK6kipC8ZD"

  getGithubDetails = (user) ->
    user = getFacebookDetails(user)
    user.pic = user.avatar_url
    user.name.full = user.name

  firebase.auth.$getCurrentUser().then (user) ->
    console.log 'user', user
    $scope.user = user
    firebase.user($cookies.guid).$save(user)

  $scope.login = (service) ->
    switch service
      when 'facebook'
        firebase.auth.$login('facebook', defaults.facebook).then (user) -> $scope.user = getFacebookDetails user
      when 'github'
        firebase.auth.$login('github', defaults.github).then (user) -> $scope.user = getGithubDetails user
      when 'twitter'
        firebase.auth.$login('twitter', defaults.twitter).then (user) -> $scope.user = getFacebookDetails user

  $scope.logout = ->
    firebase.auth.$logout()
    $scope.user = null