app = angular.module('gunslinger')

app.directive 'trackPage', (analytics) ->
  link: ($scope, $element, attributes) ->
    $element.on 'click', (event) -> analytics.page attributes.trackPage

app.directive 'trackEvent', (analytics) ->
    link: ($scope, $element, attributes) ->
      $element.on 'click', (event) -> analytics.track(attributes.trackEvent, attributes.trackData)

app.directive 'trackPageview', (analytics) ->
    link: ($scope, $element, attributes) ->
      $element.on 'click', (event) -> analytics.pageview attributes.trackPageview