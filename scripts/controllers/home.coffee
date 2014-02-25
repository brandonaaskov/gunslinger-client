angular.module('gunslinger').controller 'homeCtrl', ($scope, UsersCollection, $cookies, $window, firebase) ->
  firebase.auth.$getCurrentUser().then (user) -> $scope.currentUser = user
  $scope.users = new UsersCollection()

  $scope.$watch 'users', (users) ->
    console.log 'asdfasfsdf', users
    _(users).each (user) -> console.log 'user', user

  $scope.refreshUser = ->
    delete $cookies['guid']
    $window.location = "http://localhost:3000/"

  firebase.getServerTime().then (offset) ->
    console.log 'offset is', offset