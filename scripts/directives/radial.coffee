angular.module('gunslinger').directive 'radial', ($timeout) ->
  # private vars
  bgColor = '#e7cfad'
  color = '#efac4a'
  canvas = undefined
  context = undefined
  radius = 100
  lineWidth = 20
  xCoord = undefined
  yCoord = undefined
  margin = undefined


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
    radius = scope.radius if scope.radius
    lineWidth = scope.lineWidth if scope.lineWidth
    edgeLength = (radius + lineWidth) * 2
    canvas.width = edgeLength
    canvas.height = edgeLength
    # x/y coordinates are for the center of the circle
    xCoord = radius + lineWidth
    yCoord = radius + lineWidth
    margin = lineWidth/4

  controller: ($scope) ->

    getDegrees = (percent = $scope.percentComplete) ->
      return unless _.isNumber percent
      # 90º is actually straight down, so our starting point is 90
      return (percent * 360)/100

    getRadians = (degrees) -> degrees * Math.PI/180

    getFontSize = -> (radius + (lineWidth * 2)) * 40/100 # 40px is 100% for this

    # this is the easiest way to clear a canvas
    clearCanvas = -> canvas.width = canvas.width

    # to understand what degrees represent what quadrant of the arc, check out this handy image: http://cl.ly/Ugsu
    drawArc = (startingAngleInDegrees, endingAngleInDegrees, arcColor) ->
      context.beginPath()
      context.strokeStyle = arcColor
      context.lineWidth = lineWidth/2
      context.lineCap = 'butt'
      startAngle = getRadians(startingAngleInDegrees)
      endAngle = getRadians(endingAngleInDegrees)
      console.log 'drawing arc', [xCoord, yCoord, radius, startAngle, endAngle]
      context.arc xCoord, yCoord, radius, startAngle, endAngle
      context.stroke()

    drawBackground = -> drawArc -270, 90, bgColor #draws background well

    drawMeter = ->
      clearCanvas()
      drawBackground()
      endDegrees = 90 + getDegrees($scope.percentComplete)
      console.log "drawing arc to #{endDegrees} degrees"
      drawArc 90, endDegrees, color # draws "filled" arc on top
      addText $scope.percentComplete # adds text in the middle

    addText = (percentComplete, fontFamily = 'Proxima Nova, Arial, sans_serif') ->
      #Lets add the text
      context.fillStyle = color
      fontSize = getFontSize()
      context.font = "#{fontSize}px #{fontFamily}"
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText "#{percentComplete}%", xCoord, yCoord + margin

    # if we resize after we've drawn the arc - that's how the Canvas API is designed)
    $timeout ->
      drawMeter()
    ,

    $scope.drawMeter = drawMeter
