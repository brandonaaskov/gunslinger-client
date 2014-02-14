module.exports = (config) ->
  config.set

  # base path, that will be used to resolve files and exclude
    basePath: ""

  # testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ["mocha", "sinon-chai"]

  # list of files / patterns to load in the browser
    files: [
      "bower_components/lodash/dist/lodash.js",
      "bower_components/jquery/jquery.js",
      "bower_components/angular/angular.js",
      "bower_components/angular-sanitize/angular-sanitize.js",
      "bower_components/angular-ui-router/release/angular-ui-router.js",
      "bower_components/angular-file-upload/angular-file-upload.js",
      "bower_components/bootstrap-sass/dist/js/bootstrap.js",
      "bower_components/firebase/firebase.js",
      "bower_components/angularfire/angularfire.js",
      "bower_components/angular/",
      "bower_components/angular-mocks/angular-mocks.js",
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