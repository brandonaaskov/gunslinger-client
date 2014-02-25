(function() {
  var Analytics, app,
    __slice = [].slice;

  app = angular.module('gunslinger');

  app.provider('analytics', Analytics = (function() {
    function Analytics() {}

    Analytics.prototype._serviceInitialized = false;

    Analytics.prototype.token = null;

    Analytics.prototype.$get = function($window, $q, $cookies, firebase) {
      var analyticsDeferred, interval, methods;
      analyticsDeferred = $q.defer();
      if (!this._serviceInitialized) {
        interval = setInterval(function() {
          var _ref;
          if ((_ref = $window.analytics) != null ? _ref._readied : void 0) {
            analyticsDeferred.resolve($window.analytics);
            this._serviceInitialized = true;
            return clearInterval(interval);
          }
        }, 100);
      }
      return methods = {
        identify: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return analyticsDeferred.promise.then(function(segmentio) {
            return segmentio.identify.apply(segmentio, args);
          });
        },
        page: function(eventName) {
          return analyticsDeferred.promise.then(function(segmentio) {
            var trackThis;
            trackThis = {
              path: "" + $window.location.pathname + "#" + eventName
            };
            return segmentio.page(trackThis);
          });
        },
        pageview: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return analyticsDeferred.promise.then(function(segmentio) {
            return segmentio.pageview.apply(segmentio, args);
          });
        },
        track: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return analyticsDeferred.promise.then(function(segmentio) {
            return segmentio.track.apply(segmentio, args);
          });
        }
      };
    };

    Analytics.prototype.setToken = function(token) {
      this.token = token;
      window.analytics.load(this.token);
      return window.analytics.page();
    };

    return Analytics;

  })());

  app.config(function(analyticsProvider, config) {
    var tokens;
    tokens = {
      development: 'ttk49fjgk1',
      staging: 'ttk49fjgk1',
      production: 'ttk49fjgk1'
    };
    return analyticsProvider.setToken(tokens[config.env]);
  });

}).call(this);
