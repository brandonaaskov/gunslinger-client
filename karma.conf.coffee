module.exports = (config) ->
  config.set

  # base path, that will be used to resolve files and exclude
    basePath: ""

  # testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ["mocha", "sinon-chai"]

  # list of files / patterns to load in the browser
    files: [
      'bower_components/lodash/dist/lodash.min.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-cookies/angular-cookies.min.js',
      'bower_components/bootstrap-sass/dist/js/bootstrap.min.js',
      'bower_components/firebase/firebase-debug.js',
      'bower_components/angularfire/angularfire.min.js',
      'bower_components/firebase-simple-login/firebase-simple-login.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'vendor/angular-strap/angular-strap.min.js',
      'vendor/angular-strap/angular-strap.tpl.min.js',
      'vendor/videojs/video.js',
      "scripts/**/*.coffee",
      "tests/**/*.coffee"
    ]

  # list of files / patterns to exclude
    exclude: []

  # web server port
    port: 8008

  # level of logging
  # possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

  # enable / disable watching file and executing tests whenever any file changes
    autoWatch: false

  # Start these browsers, currently available:
  # - Chrome
  # - ChromeCanary
  # - Firefox
  # - Opera
  # - Safari (only Mac)
  # - PhantomJS
  # - IE (only Windows)
    browsers: ["PhantomJS"]

  # Continuous Integration mode
  # if true, it capture browsers, run tests and exit
    singleRun: true