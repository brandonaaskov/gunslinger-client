angular.module('gunslinger').service 'alerts', ($alert, $rootScope, $interpolate) ->
  events = [
    name: 'userChanged'
    title: 'Login Change'
    content: 'The user has changed to...{{name}}'
    type: 'info'
    placement: 'top-right'
    container: 'body'
    animation: 'am-fade'
    duration: 3
  ,
    name: 'test'
    title: 'test'
    content: 'This test and expression interpolated properly {{5 * 20}}'
    type: 'success'
    placement: 'top-right'
    container: 'body'
    animation: 'am-slide-right'
    duration: 3
  ]

  dispatch = (eventName, scope) ->
    alertOptions = _.find events, { name: eventName }
    alertOptions.content = $interpolate(alertOptions.content)(scope)
    $alert alertOptions

  return {
    dispatch: dispatch
  }