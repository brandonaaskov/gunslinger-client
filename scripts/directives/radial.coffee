angular.module('gunslinger').directive 'radial', () ->
  restrict: 'E'
  templateUrl: '../views/radial.html'
  scope:
    radius: '='
    lineWidth: '='
  link: (scope, element) ->
    bgColor = '#222'
    color = '#ff0000'
    canvas = angular.element(element).find('canvas').get(0)
    context = canvas.getContext '2d'
    lineWidth = if scope.lineWidth then scope.lineWidth else 10
    # x/y coordinates are for the center of the circle
    xCoord = scope.radius
    yCoord = scope.radius
    radius = scope.radius - lineWidth

    getRadians = (degrees) -> degrees * Math.PI/180

    # to understand what degrees represent what quadrant of the arc, check out this handy image: http://cl.ly/Ugsu
    drawArc = (startingAngleInDegrees, endingAngleInDegrees, arcColor) ->
      context.beginPath()
      context.strokeStyle = arcColor
      context.lineWidth = lineWidth
      startAngle = getRadians(startingAngleInDegrees)
      endAngle = getRadians(endingAngleInDegrees)
      context.arc xCoord, yCoord, radius, startAngle, endAngle
      context.stroke()

    drawArc -270, 90, bgColor
    drawArc 90, -210, color