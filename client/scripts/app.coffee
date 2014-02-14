angular.module('gunslingr', [
  'ui.router'
  'angularFileUpload'
  'firebase'
  'ngSanitize'
  ])
  .config ($stateProvider, $urlRouterProvider) ->
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state 'home',
        url: "/",
        templateUrl: "views/home.html"
      .state 'uploads/manager',
        url: "/uploads/manager",
        templateUrl: "views/manage.html"
      .state 'watch',
        url: "/watch/:id",
        templateUrl: "views/watch.html"
        onExit: -> videojs('player').dispose()

      .state 'playlist/builder',
        url: "/playlist/builder",
        templateUrl: "views/playlist_builder.html"
        controller: 'playlistBuilderCtrl'

      .state 'playlist/player',
          url: "/playlist/player",
          templateUrl: "views/playlist_player.html"
          controller: 'playlistPlayerCtrl'