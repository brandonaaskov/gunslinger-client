angular.module('gunslinger').directive 'radial', () ->
  restrict: 'E'
  replace: true
  templateUrl: '../views/radial.html'
  scope:
    radius: '='
    lineWidth: '='
  link: (scope, element) ->
    bgColor = '#e7cfad'
    color = '#efac4a'
    canvas = angular.element(element).get(0)
    context = canvas.getContext '2d'
    lineWidth = scope.lineWidth or 20
    # x/y coordinates are for the center of the circle
    xCoord = scope.radius
    yCoord = scope.radius
    radius = scope.radius - (lineWidth*2)
    scope.edgeLength = (scope.radius + lineWidth) * 2

    getRadians = (degrees) -> degrees * Math.PI/180

    # to understand what degrees represent what quadrant of the arc, check out this handy image: http://cl.ly/Ugsu
    drawArc = (startingAngleInDegrees, endingAngleInDegrees, arcColor, lineCap = 'butt') ->
      context.beginPath()
      context.strokeStyle = arcColor
      context.lineWidth = lineWidth/2
      context.lineCap = lineCap
      startAngle = getRadians(startingAngleInDegrees)
      endAngle = getRadians(endingAngleInDegrees)
      context.arc xCoord, yCoord - lineWidth, radius, startAngle, endAngle
      context.stroke()

    addText = (percentComplete, fontSize = '40px', fontFamily = 'Proxima Nova') ->
      #Lets add the text
      context.fillStyle = color
      context.font = "#{fontSize} #{fontFamily}"
      context.textAlign = 'center'
      context.textBaseline = 'bottom'
      text = percentComplete + '%'
      context.fillText text, xCoord, yCoord

    drawArc -270, 90, bgColor
    drawArc 90, -210, color
    addText(15)
