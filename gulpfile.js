//gulp stuff i need
var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    plumber = require('gulp-plumber');

// non-gulp stuff i need
var _ = require('lodash'),
    http = require('http'),
    connect = require('connect');

//other stuff
var paths = {
  scripts: ['scripts/**/*.coffee'],
  tests: ['tests/**/*.coffee']
};

var serverPort = 3000

//compiles coffee script files
gulp.task('compile', function () {
  gulp.src(paths.scripts)
      .pipe(plumber())
      .pipe(coffee())
      .pipe(gulp.dest('scripts'));

  gulp.src(paths.tests)
      .pipe(plumber())
      .pipe(coffee())
      .pipe(gulp.dest('tests'));
});

// recompile coffeescript files on change
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['build']);
  gulp.watch(paths.tests, ['build']);
});

// launch this repo as a server (port 3000)
gulp.task('serve', function () {
  var app = connect()
      .use(connect.static(__dirname));

  http.createServer(app).listen(serverPort);
  console.log('server running on localhost:' + serverPort);
});

// builds everything to the `dist` directory
gulp.task('build', ['compile']);

// runs a build and launches a server
gulp.task('default', ['build', 'watch', 'serve']);