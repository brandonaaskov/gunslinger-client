(function() {
  angular.module('gunslinger').service('alerts', function($alert, $rootScope) {
    var events;
    events = ['userChanged'];
    return _(events).each(function(eventName) {
      return $rootScope.on(eventName, function(event) {
        var options;
        console.log('event fired', [eventName, event]);
        options = {
          title: "my test alreat",
          content: 'Best check yo self, you\'re not looking too good.',
          placement: 'top',
          type: 'info',
          show: true
        };
        return $alert(options).$show();
      });
    });
  });

}).call(this);
