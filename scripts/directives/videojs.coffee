angular.module('hampton').directive 'videojs', ($window) ->
  restrict: 'E'
  replace: true
  template: '<video src="https://s3.amazonaws.com/hampton-test/360p.mp4" id="hampton-video" class="video-js vjs-hampton-skin full" controls preload="auto" ></video>'

  link: (scope, element) ->
    videojs.Replay = videojs.Button.extend({
      init: (player, options) ->
        videojs.Button.call(this, player, options)
        this.on('click', this.onClick)
    })

    videojs.Replay.prototype.onClick = () ->
      player.currentTime 0
      player.play()

    createReplayButton = () ->
      props = {
        className: 'vjs-replay-control vjs-control'
        innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Replay</span></div>'
        role: 'button'
        'aria-live': 'polite'
        tabIndex: 0
      }
      videojs.Component.prototype.createEl(null, props)

    replay = null;
    videojs.plugin('replay', () ->
      options = { 'el' : createReplayButton() }
      replay = new videojs.Replay(this, options)
      this.controlBar.el().appendChild replay.el()
    );

    videojs.Share = videojs.Button.extend({
      init: (player, options) ->
        videojs.Button.call(this, player, options)
        this.on('click', this.onClick)
    })

    videojs.Share.prototype.onClick = () ->


    createShareButton = () ->
      props = {
        className: 'vjs-share-control vjs-control'
        innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Share</span></div>'
        role: 'button'
        'aria-live': 'polite'
        tabIndex: 0
      }
      videojs.Component.prototype.createEl(null, props)

    share = null;
    videojs.plugin('share', () ->
      options = { 'el' : createShareButton() }
      share = new videojs.Share(this, options)
      this.controlBar.el().appendChild share.el()
    );

    player = videojs(element.attr('id'), {
      plugins: { replay: {}, share: {} }
    })

    resize = () ->
      aspect_ratio = 9/16
      if (($window.innerHeight / $window.innerWidth) > aspect_ratio)
        calc_height = $window.innerWidth * aspect_ratio
        calc_width = $window.innerWidth
      else
        calc_height = $window.innerHeight
        calc_width = $window.innerHeight / aspect_ratio

      angular.element(player.el()).css({
        'top': (($window.innerHeight - calc_height) / 2) + 'px'
        'left': (($window.innerWidth - calc_width) / 2) + 'px'
      })

      player.dimensions(calc_width, calc_height)


    player.ready () ->
      resize()
      player.play()

    angular.element($window).on 'resize', ->
      resize()