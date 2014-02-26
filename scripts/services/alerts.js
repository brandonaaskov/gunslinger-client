(function() {
  angular.module('gunslinger').service('alerts', function($alert, $rootScope, $interpolate) {
    var dispatch, events;
    events = [
      {
        name: 'userChanged',
        title: 'Login Change',
        content: 'The user has changed to...{{name}}',
        type: 'info',
        placement: 'top-right',
        container: 'body',
        animation: 'am-fade',
        duration: 3
      }, {
        name: 'test',
        title: 'test',
        content: 'This test and expression interpolated properly {{5 * 20}}',
        type: 'success',
        placement: 'top-right',
        container: 'body',
        animation: 'am-fade',
        duration: 3
      }
    ];
    dispatch = function(eventName, scope) {
      var alertOptions;
      alertOptions = _.find(events, {
        name: eventName
      });
      alertOptions.content = $interpolate(alertOptions.content)(scope);
      return $alert(alertOptions);
    };
    return {
      dispatch: dispatch
    };
  });

}).call(this);