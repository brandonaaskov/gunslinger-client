angular.module('gunslingr').directive 'contenteditable', ->
  restrict: 'A'
  require: "ngModel"
  scope:
    onBlur: '&'
  link: (scope, element, attrs, ctrl) ->
    # view -> model
    element.bind 'keypress', (event) ->
      return unless event.keyCode is 13 # enter key
      event.stopPropagation()
      element.trigger('blur')

    element.bind "blur", ->
      scope.$apply ->
        ctrl.$setViewValue element.html()
        scope.onBlur()

    # model -> view
    ctrl.$render = ->
      element.html ctrl.$viewValue

    # load init value from DOM
    ctrl.$render()