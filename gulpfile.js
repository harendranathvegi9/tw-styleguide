var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;
var serve = require('gulp-serve');

//To make media queries and respond.js to work with IE8 Serve it on local host
//Port 3000
gulp.task('serve', ['styleguide:create'], serve('styleguide'));

console.log(serve)

//clean build folder
gulp.task('template:clean', function(cb) {
  del(['./build', './styleguide'], cb);
})
//Copy template folder
.task('tempate:copy', ['template:clean'], function() {
  return gulp.src('src/tw-template/**')
    .pipe(gulp.dest('template'));
})
//compile less file
.task('template:css', ['template:clean', 'tempate:copy'], function() {
  return gulp.src(['src/less/thoughtworks.less', 'src/less/thoughtworks-ie.less'])
    .pipe(less())
    .pipe(gulp.dest('template/public'))
    .pipe(minify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('template/public'));
})
//JSlint and minfy JS
.task('template:js', ['template:clean', 'tempate:copy'], function() {
  return gulp.src('src/js/thoughtworks.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('template/public'))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('template/public'));
})
//Copy styleguide assets
.task('template:assets', ['tempate:copy'], function() {
  return gulp.src(['./src/img/**'])
    .pipe(gulp.dest('./template/public'));
})
//Create styleguide
.task('styleguide:create', ['tempate:create'], function(cb) {
  exec('"./node_modules/.bin/kss-node" --config "./kss-config.json"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
//Create the template folder
.task('tempate:create', ['template:clean', 'tempate:copy', 'template:css', 'template:js', 'template:assets'])
//Generate the styleguide
.task('styleguide', ['styleguide:create'], function() {
  gulp.watch(['./src/less/**/*.*', './src/js/**/*.*'], ['styleguide:create']);
});