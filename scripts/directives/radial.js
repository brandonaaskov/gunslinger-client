(function() {
  angular.module('gunslinger').directive('radial', function($timeout) {
    var bgColor, canvas, color, context, lineWidth, margin, radius, xCoord, yCoord;
    bgColor = '#e7cfad';
    color = '#efac4a';
    canvas = void 0;
    context = void 0;
    radius = 100;
    lineWidth = 20;
    xCoord = void 0;
    yCoord = void 0;
    margin = void 0;
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
        if (scope.radius) {
          radius = scope.radius;
        }
        if (scope.lineWidth) {
          lineWidth = scope.lineWidth;
        }
        edgeLength = (radius + lineWidth) * 2;
        canvas.width = edgeLength;
        canvas.height = edgeLength;
        xCoord = radius + lineWidth;
        yCoord = radius + lineWidth;
        return margin = lineWidth / 4;
      },
      controller: function($scope) {
        var addText, clearCanvas, drawArc, drawBackground, drawMeter, getDegrees, getFontSize, getRadians;
        getDegrees = function(percent) {
          if (percent == null) {
            percent = $scope.percentComplete;
          }
          if (!_.isNumber(percent)) {
            return;
          }
          return (percent * 360) / 100;
        };
        getRadians = function(degrees) {
          return degrees * Math.PI / 180;
        };
        getFontSize = function() {
          return (radius + (lineWidth * 2)) * 40 / 100;
        };
        clearCanvas = function() {
          return canvas.width = canvas.width;
        };
        drawArc = function(startingAngleInDegrees, endingAngleInDegrees, arcColor) {
          var endAngle, startAngle;
          context.beginPath();
          context.strokeStyle = arcColor;
          context.lineWidth = lineWidth / 2;
          context.lineCap = 'butt';
          startAngle = getRadians(startingAngleInDegrees);
          endAngle = getRadians(endingAngleInDegrees);
          console.log('drawing arc', [xCoord, yCoord, radius, startAngle, endAngle]);
          context.arc(xCoord, yCoord, radius, startAngle, endAngle);
          return context.stroke();
        };
        drawBackground = function() {
          return drawArc(-270, 90, bgColor);
        };
        drawMeter = function() {
          var endDegrees;
          clearCanvas();
          drawBackground();
          endDegrees = 90 + getDegrees($scope.percentComplete);
          console.log("drawing arc to " + endDegrees + " degrees");
          drawArc(90, endDegrees, color);
          return addText($scope.percentComplete);
        };
        addText = function(percentComplete, fontFamily) {
          var fontSize;
          if (fontFamily == null) {
            fontFamily = 'Proxima Nova, Arial, sans_serif';
          }
          context.fillStyle = color;
          fontSize = getFontSize();
          context.font = "" + fontSize + "px " + fontFamily;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          return context.fillText("" + percentComplete + "%", xCoord, yCoord + margin);
        };
        return $timeout(function() {
          return drawMeter();
        }, $scope.drawMeter = drawMeter);
      }
    };
  });

}).call(this);
