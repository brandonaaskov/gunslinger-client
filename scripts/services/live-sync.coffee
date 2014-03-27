angular.module('gunslinger').service 'liveSync', (firebase, $window) ->
  navigator.getMedia =
    navigator.getUserMedia or
    navigator.webkitGetUserMedia or
    navigator.mozGetUserMedia or
    navigator.msGetUserMedia

  AudioContext = $window.AudioContext or $window.webkitAudioContext

  sync = (startTime, now, videoLength) ->
    jumpTo = (now - startTime) % videoLength
    console.log 'jumpTo (in seconds)', jumpTo/1000
    console.log 'jumpTo (in minutes)', jumpTo/1000/60

    constraints =
      video: false
      audio: true

    success = (stream) ->
      context = new AudioContext()
      microphone = context.createMediaStreamSource(stream)
      filter = context.createBiquadFilter()
      # microphone -> filter -> destination.
      microphone.connect filter
      filter.connect context.destination

    navigator.getMedia constraints, success

  firebase.getServerTime().then (offset) ->
    noonToday = 1395687600000
    fakeVideoLength = 22 * 60 * 1000
    sync noonToday, offset, fakeVideoLength

  publicApi =
    sync: sync