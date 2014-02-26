app = angular.module('gunslinger')

app.directive 'trackPage', (analytics) ->
  restrict: 'A'
  link: ($scope, $element, attributes) ->

    $element.on 'click', (event) ->
      analytics.page(attributes.trackPage)

app.directive 'trackEvent', (analytics) ->
    restrict: 'A'
    link: ($scope, $element, attributes) ->
      $element.on 'click', (event) -> analytics.track(attributes.trackEvent, attributes.trackData)

app.directive 'trackPageview', (analytics) ->
    restrict: 'A'
    link: ($scope, $element, attributes) ->
      $element.on 'click', (event) -> analytics.pageview(attributes.trackPageview)