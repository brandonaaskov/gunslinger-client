(function() {
  angular.module('gunslingr').directive('contenteditable', function() {
    return {
      restrict: 'A',
      require: "ngModel",
      scope: {
        onBlur: '&'
      },
      link: function(scope, element, attrs, ngModel) {
        element.bind('keypress', function(event) {
          if (event.keyCode !== 13) {
            return;
          }
          event.stopPropagation();
          return element.trigger('blur');
        });
        element.bind("blur", function() {
          return scope.$apply(function() {
            ngModel.$setViewValue(element.html());
            return scope.onBlur();
          });
        });
        ngModel.$render = function() {
          return element.html(ngModel.$viewValue);
        };
        return ngModel.$render();
      }
    };
  });

}).call(this);
