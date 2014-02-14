(function() {
  module.exports = function(config) {
    return config.set({
      basePath: "public",
      frameworks: ["mocha", "sinon-chai"],
      files: ["bower_components/lodash/dist/lodash.js", "bower_components/jquery/jquery.js", "bower_components/angular/angular.js", "bower_components/angular-sanitize/angular-sanitize.js", "bower_components/angular-ui-router/release/angular-ui-router.js", "bower_components/angular-file-upload/angular-file-upload.js", "bower_components/bootstrap-sass/dist/js/bootstrap.js", "bower_components/firebase/firebase.js", "bower_components/angularfire/angularfire.js", "bower_components/angular/", "bower_components/angular-mocks/angular-mocks.js", "scripts/**/*.coffee", "tests/**/*.coffee"],
      exclude: [],
      port: 8080,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ["Chrome"],
      singleRun: false
    });
  };

}).call(this);
