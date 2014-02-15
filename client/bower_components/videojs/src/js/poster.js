/* Poster Image
================================================================================ */
/**
 * The component that handles showing the poster image.
 *
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PosterImage = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);

    if (!player.poster() || !player.controls()) {
      this.hide();
    }

    player.on('play', vjs.bind(this, this.hide));
  }
});

vjs.PosterImage.prototype.createEl = function(){
  var el = vjs.createEl('div', {
        className: 'vjs-poster',

        // Don't want poster to be tabbable.
        tabIndex: -1
      }),
      poster = this.player_.poster();

  if (poster) {
    if ('backgroundSize' in el.style) {
      el.style.backgroundImage = 'url("' + poster + '")';
    } else {
      el.appendChild(vjs.createEl('img', { src: poster }));
    }
  }

  return el;
};

vjs.PosterImage.prototype.onClick = function(){
  // Only accept clicks when controls are enabled
  if (this.player().controls()) {
    this.player_.play();
  }
};
