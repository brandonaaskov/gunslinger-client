(function() {
  angular.module('gunslingr').directive('contenteditable', function() {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        onBlur: '&'
      },
      link: function(scope, element, attrs, ctrl) {
        element.bind('keypress', function(event) {
          if (event.keyCode !== 13) {
            return;
          }
          event.stopPropagation();
          return element.trigger('blur');
        });
        element.bind("blur", function() {
          return scope.$apply(function() {
            ctrl.$setViewValue(element.html());
            return scope.onBlur();
          });
        });
        ctrl.$render = function() {
          return element.html(ctrl.$viewValue);
        };
        return ctrl.$render();
      }
    };
  });

}).call(this);
