//gulp stuff i need
var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass');

// non-gulp stuff i need
var _ = require('lodash'),
    http = require('http'),
    connect = require('connect');

//other stuff
var paths = {
  scripts: ['scripts/**/*.coffee'],
  tests: ['tests/**/*.coffee'],
  styles: ['styles/**/*.scss']
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

gulp.task('sass', function () {
  gulp.src(paths.styles)
      .pipe(plumber())
      .pipe(sass())
      .pipe(gulp.dest('styles'));
});

// recompile coffeescript files on change
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['build']);
  gulp.watch(paths.tests, ['build']);
  gulp.watch(paths.styles, ['build']);
});

// launch this repo as a server (port 3000)
gulp.task('serve', function () {
  var app = connect().use(connect.static(__dirname));

  http.createServer(app).listen(serverPort);
  console.log('server running on localhost:' + serverPort);
});

// builds everything to the `dist` directory
gulp.task('build', ['compile', 'sass']);

// runs a build and launches a server
gulp.task('default', ['build', 'watch', 'serve']);
