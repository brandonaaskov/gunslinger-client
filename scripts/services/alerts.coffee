angular.module('gunslinger').service 'alerts', ($alert, $rootScope) ->
  events = ['userChanged']

  _(events).each (eventName) ->
    $rootScope.on eventName, (event) ->
      console.log 'event fired', [eventName, event]

      options =
        title: "my test alreat"
        content: 'Best check yo self, you\'re not looking too good.'
        placement: 'top'
        type: 'info'
        show: true
      $alert(options).$show()