(function() {
  module.exports = function(config) {
    return config.set({
      basePath: "",
      frameworks: ["mocha", "sinon-chai"],
      files: ['bower_components/lodash/dist/lodash.min.js', 'bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.min.js', 'bower_components/angular-sanitize/angular-sanitize.min.js', 'bower_components/angular-cookies/angular-cookies.min.js', 'bower_components/bootstrap-sass/dist/js/bootstrap.min.js', 'bower_components/firebase/firebase-debug.js', 'bower_components/angularfire/angularfire.min.js', 'bower_components/firebase-simple-login/firebase-simple-login.js', 'bower_components/angular-animate/angular-animate.min.js', 'vendor/angular-strap/angular-strap.min.js', 'vendor/angular-strap/angular-strap.tpl.min.js', 'vendor/videojs/video.js', "scripts/**/*.coffee", "tests/**/*.coffee"],
      exclude: [],
      port: 8008,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ["PhantomJS"],
      singleRun: true
    });
  };

}).call(this);
