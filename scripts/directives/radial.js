(function() {
  angular.module('gunslinger').directive('radial', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '../views/radial.html',
      scope: {
        radius: '=',
        lineWidth: '='
      },
      link: function(scope, element) {
        var addText, bgColor, canvas, color, context, drawArc, getRadians, lineWidth, radius, xCoord, yCoord;
        bgColor = '#e7cfad';
        color = '#efac4a';
        canvas = angular.element(element).get(0);
        context = canvas.getContext('2d');
        lineWidth = scope.lineWidth || 20;
        xCoord = scope.radius;
        yCoord = scope.radius;
        radius = scope.radius - (lineWidth * 2);
        scope.edgeLength = (scope.radius + lineWidth) * 2;
        getRadians = function(degrees) {
          return degrees * Math.PI / 180;
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
          context.arc(xCoord, yCoord - lineWidth, radius, startAngle, endAngle);
          return context.stroke();
        };
        addText = function(percentComplete, fontSize, fontFamily) {
          var text;
          if (fontSize == null) {
            fontSize = '40px';
          }
          if (fontFamily == null) {
            fontFamily = 'Proxima Nova';
          }
          context.fillStyle = color;
          context.font = "" + fontSize + " " + fontFamily;
          context.textAlign = 'center';
          context.textBaseline = 'bottom';
          text = percentComplete + '%';
          return context.fillText(text, xCoord, yCoord);
        };
        drawArc(-270, 90, bgColor);
        drawArc(90, -210, color);
        return addText(15);
      }
    };
  });

}).call(this);
