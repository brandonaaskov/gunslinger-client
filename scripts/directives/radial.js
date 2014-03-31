(function() {
  angular.module('gunslinger').directive('radial', function($timeout) {
    var bgColor, canvas, color, context, lineWidth, radius, xCoord, yCoord;
    bgColor = '#e7cfad';
    color = '#efac4a';
    canvas = void 0;
    context = void 0;
    lineWidth = void 0;
    radius = void 0;
    xCoord = 0;
    yCoord = 0;
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '../views/radial.html',
      scope: {
        radius: '=',
        lineWidth: '=',
        percentComplete: '='
      },
      link: function(scope, element) {
        var edgeLength;
        canvas = angular.element(element).get(0);
        context = canvas.getContext('2d');
        lineWidth = scope.lineWidth || 20;
        radius = (scope.radius || 100) - lineWidth;
        edgeLength = (radius + lineWidth) * 2;
        console.log('resize canvas to', edgeLength);
        canvas.width = edgeLength;
        canvas.height = edgeLength;
        xCoord = scope.radius;
        return yCoord = scope.radius;
      },
      controller: function($scope) {
        var addText, drawArc, getFontSize, getRadians;
        getRadians = function(degrees) {
          return degrees * Math.PI / 180;
        };
        getFontSize = function() {
          return ($scope.radius * 40) / 100;
        };
        drawArc = function(startingAngleInDegrees, endingAngleInDegrees, arcColor, lineCap) {
          var endAngle, startAngle;
          if (lineCap == null) {
            lineCap = 'butt';
          }
          context.beginPath();
          context.strokeStyle = arcColor;
          context.lineWidth = lineWidth / 2;
          context.lineCap = lineCap;
          startAngle = getRadians(startingAngleInDegrees);
          endAngle = getRadians(endingAngleInDegrees);
          context.arc(xCoord, yCoord, radius, startAngle, endAngle);
          return context.stroke();
        };
        addText = function(percentComplete, fontFamily) {
          var fontSize, text;
          if (fontFamily == null) {
            fontFamily = 'Proxima Nova';
          }
          context.fillStyle = color;
          fontSize = getFontSize();
          context.font = "" + fontSize + "px " + fontFamily;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          text = percentComplete + '%';
          return context.fillText(text, xCoord, yCoord);
        };
        return $timeout(function() {
          drawArc(-270, 90, bgColor);
          drawArc(90, -210, color);
          return addText(15);
        }, 0);
      }
    };
  });

}).call(this);
