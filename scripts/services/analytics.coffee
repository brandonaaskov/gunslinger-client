app = angular.module('gunslinger')

app.provider 'analytics',
  class Analytics
    _serviceInitialized: false
    token: null
    $get: ($window, $q, $cookies, firebase) ->
      analyticsDeferred = $q.defer()

      unless @_serviceInitialized
        interval = setInterval ->
          if $window.analytics?._readied
            analyticsDeferred.resolve($window.analytics)
            @_serviceInitialized = true
            clearInterval(interval)
        , 100

      methods =
        identify: (args...) ->
          analyticsDeferred.promise.then (segmentio) ->
            segmentio.identify.apply(segmentio, args)
        page: (eventName) ->
          analyticsDeferred.promise.then (segmentio) ->
            trackThis = {path: "#{$window.location.pathname}##{eventName}"}
            segmentio.page(trackThis)
        pageview: (args...) ->
          analyticsDeferred.promise.then (segmentio) ->
            segmentio.pageview.apply(segmentio, args)
        track: (args...) ->
          analyticsDeferred.promise.then (segmentio) ->
            segmentio.track.apply(segmentio, args)

    setToken: (token) ->
      @token = token
      window.analytics.load(@token)
      window.analytics.page()

app.config (analyticsProvider, config) ->
  tokens =
    development: 'ttk49fjgk1'
    staging: 'ttk49fjgk1'
    production: 'ttk49fjgk1'
  analyticsProvider.setToken(tokens[config.env])