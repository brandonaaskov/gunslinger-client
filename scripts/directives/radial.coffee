angular.module('gunslinger').directive 'radial', () ->
  restrict: 'E'
  templateUrl: 'templates/radial.html'
  scope:
    width: '='
    height: '='
    radius: '='
    lineWidth: '='
    backgroundColor: '='
    color: '='
  link: (scope, element) ->
    width = if scope.width then scope.width else 100
    height = if scope.width then scope.width else 100
    scope.width = width
    scope.height = height

    radius = if scope.radius then scope.radius else width/2
    lineWidth = if scope.lineWidth then scope.lineWidth else 10
    startingAngle = 0
    endingAngle = -270
    canvas = angular.element(element).find('canvas').get(0)
    context = canvas.getContext '2d'

    getRadians = (degrees) -> degrees * Math.PI/180

    #    context.clearRect 0, 0, width, height
    context.beginPath()
    context.strokeStyle = "#00ff00"
    context.lineWidth = lineWidth

    #   arc(x, y, radius, startAngle, endAngle, [counterClockWise])
    context.arc width, height, radius, startingAngle, endingAngle, Math.PI * 2
    context.stroke()

# angle in radians = angle in degrees * PI / 180
#    radians = getRadians(200) * Math.PI/180
#    context.beginPath()
#    context.strokeStyle = '#ff0000'
#    context.lineWidth = lineWidth

# The arc starts from the rightmost end. If we deduct 90 degrees from the angles the arc will start from the topmost end
#    context.arc width/2, height/2, radius, startingAngle - 90 * Math.PI/180, radians - 90 * Math.PI/180

# you can see the arc now
#    context.stroke()
#
#      #Lets add the text
#      ctx.fillStyle = color
#      ctx.font = "50px bebas"
#      text = Math.floor(degrees / 360 * 100) + "%"
#
#      #Lets center the text
#      #deducting half of text width from position x
#      text_width = ctx.measureText(text).width
#
#      #adding manual value to position y since the height of the text cannot
#      #be measured easily. There are hacks but we will keep it manual for now.
#      ctx.fillText text, W / 2 - text_width / 2, H / 2 + 15
#      return
#    draw = ->
#
#      #Cancel any movement animation if a new chart is requested
#      clearInterval animation_loop  unless typeof animation_loop is `undefined`
#
#      #random degree from 0 to 360
#      new_degrees = Math.round(Math.random() * 360)
#      difference = new_degrees - degrees
#
#      #This will animate the gauge to new positions
#      #The animation will take 1 second
#      #time for each frame is 1sec / difference in degrees
#      animation_loop = setInterval(animate_to, 1000 / difference)
#      return
#
#    #function to make the chart move to new degrees
#    animate_to = ->
#
#      #clear animation loop if degrees reaches to new_degrees
#      clearInterval animation_loop  if degrees is new_degrees
#      if degrees < new_degrees
#        degrees++
#      else
#        degrees--
#      init()
#      return
#    canvas = document.getElementById("canvas")
#    ctx = canvas.getContext("2d")
#    W = canvas.width
#    H = canvas.height
#    degrees = 0
#    new_degrees = 0
#    difference = 0
#    color = "lightgreen"
#    bgcolor = "#222"
#    text = undefined
#    animation_loop = undefined
#    redraw_loop = undefined
#
#    #Lets add some animation for fun
#    draw()
#    redraw_loop = setInterval(draw, 2000) #Draw a new chart every 2 seconds
#    return