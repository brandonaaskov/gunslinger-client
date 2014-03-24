(function() {
  var app;

  app = angular.module('gunslinger');

  app.directive('trackPage', function(analytics) {
    return {
      restrict: 'A',
      link: function($scope, $element, attributes) {
        return $element.on('click', function(event) {
          return analytics.page(attributes.trackPage);
        });
      }
    };
  });

  app.directive('trackEvent', function(analytics) {
    return {
      restrict: 'A',
      link: function($scope, $element, attributes) {
        return $element.on('click', function(event) {
          return analytics.track(attributes.trackEvent, attributes.trackData);
        });
      }
    };
  });

  app.directive('trackPageview', function(analytics) {
    return {
      restrict: 'A',
      link: function($scope, $element, attributes) {
        return $element.on('click', function(event) {
          return analytics.pageview(attributes.trackPageview);
        });
      }
    };
  });

}).call(this);
