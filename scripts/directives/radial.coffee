angular.module('gunslinger').directive 'radial', ($timeout) ->
  # private vars
  bgColor = '#e7cfad'
  color = '#efac4a'
  canvas = undefined
  context = undefined
  lineWidth = undefined
  radius = undefined
  xCoord = 0
  yCoord = 0


  restrict: 'E'
  replace: true
  templateUrl: '../views/radial.html'
  scope:
    radius: '='
    lineWidth: '='
    percentComplete: '='
  link: (scope, element) ->
    canvas = angular.element(element).get(0)
    context = canvas.getContext '2d'
    lineWidth = scope.lineWidth or 20
    radius = (scope.radius or 100) - (lineWidth)
    edgeLength = (radius + lineWidth) * 2
    console.log 'resize canvas to', edgeLength
    canvas.width = edgeLength
    canvas.height = edgeLength
    # x/y coordinates are for the center of the circle
    xCoord = scope.radius
    yCoord = scope.radius

  controller: ($scope) ->

    getRadians = (degrees) -> degrees * Math.PI/180
    getFontSize = -> ($scope.radius * 40)/100 # 40px is 100% for this

    # to understand what degrees represent what quadrant of the arc, check out this handy image: http://cl.ly/Ugsu
    drawArc = (startingAngleInDegrees, endingAngleInDegrees, arcColor, lineCap = 'butt') ->
      context.beginPath()
      context.strokeStyle = arcColor
      context.lineWidth = lineWidth/2
      context.lineCap = lineCap
      startAngle = getRadians(startingAngleInDegrees)
      endAngle = getRadians(endingAngleInDegrees)
      context.arc xCoord, yCoord, radius, startAngle, endAngle
      context.stroke()

    addText = (percentComplete, fontFamily = 'Proxima Nova') ->
      #Lets add the text
      context.fillStyle = color
      fontSize = getFontSize()
      context.font = "#{fontSize}px #{fontFamily}"
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      text = percentComplete + '%'
      context.fillText text, xCoord, yCoord

    # if we resize after we've drawn the arc - that's how the Canvas API is designed)
    $timeout ->
      drawArc -270, 90, bgColor
      drawArc 90, -210, color
      addText 15
    , 0
