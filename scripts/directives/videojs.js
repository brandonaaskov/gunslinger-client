(function() {
  angular.module('hampton').directive('videojs', function($window) {
    return {
      restrict: 'E',
      replace: true,
      template: '<video src="https://s3.amazonaws.com/hampton-test/360p.mp4" id="hampton-video" class="video-js vjs-hampton-skin full" controls preload="auto" ></video>',
      link: function(scope, element) {
        var createReplayButton, createShareButton, player, replay, resize, share;
        videojs.Replay = videojs.Button.extend({
          init: function(player, options) {
            videojs.Button.call(this, player, options);
            return this.on('click', this.onClick);
          }
        });
        videojs.Replay.prototype.onClick = function() {
          player.currentTime(0);
          return player.play();
        };
        createReplayButton = function() {
          var props;
          props = {
            className: 'vjs-replay-control vjs-control',
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Replay</span></div>',
            role: 'button',
            'aria-live': 'polite',
            tabIndex: 0
          };
          return videojs.Component.prototype.createEl(null, props);
        };
        replay = null;
        videojs.plugin('replay', function() {
          var options;
          options = {
            'el': createReplayButton()
          };
          replay = new videojs.Replay(this, options);
          return this.controlBar.el().appendChild(replay.el());
        });
        videojs.Share = videojs.Button.extend({
          init: function(player, options) {
            videojs.Button.call(this, player, options);
            return this.on('click', this.onClick);
          }
        });
        videojs.Share.prototype.onClick = function() {};
        createShareButton = function() {
          var props;
          props = {
            className: 'vjs-share-control vjs-control',
            innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Share</span></div>',
            role: 'button',
            'aria-live': 'polite',
            tabIndex: 0
          };
          return videojs.Component.prototype.createEl(null, props);
        };
        share = null;
        videojs.plugin('share', function() {
          var options;
          options = {
            'el': createShareButton()
          };
          share = new videojs.Share(this, options);
          return this.controlBar.el().appendChild(share.el());
        });
        player = videojs(element.attr('id'), {
          plugins: {
            replay: {},
            share: {}
          }
        });
        resize = function() {
          var aspect_ratio, calc_height, calc_width;
          aspect_ratio = 9 / 16;
          if (($window.innerHeight / $window.innerWidth) > aspect_ratio) {
            calc_height = $window.innerWidth * aspect_ratio;
            calc_width = $window.innerWidth;
          } else {
            calc_height = $window.innerHeight;
            calc_width = $window.innerHeight / aspect_ratio;
          }
          angular.element(player.el()).css({
            'top': (($window.innerHeight - calc_height) / 2) + 'px',
            'left': (($window.innerWidth - calc_width) / 2) + 'px'
          });
          return player.dimensions(calc_width, calc_height);
        };
        player.ready(function() {
          resize();
          return player.play();
        });
        return angular.element($window).on('resize', function() {
          return resize();
        });
      }
    };
  });

}).call(this);
