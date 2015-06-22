var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;

//clean build folder
gulp.task('clean:build', function(cb) {
  del(['./build', './styleguide'], cb);
})
//Copy template folder
.task('tempate:copy', ['clean:build'], function() {
  return gulp.src('src/tw-template/**')
    .pipe(gulp.dest('build/template'));
})
//compile less file
.task('template:css', ['clean:build', 'tempate:copy'], function() {
  return gulp.src('src/less/thoughtworks.less')
    .pipe(less())
    .pipe(gulp.dest('build/template/public'))
    .pipe(minify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/template/public'));
})
//Create styleguide
.task('styleguide:create', ['clean:build', 'tempate:copy', 'tempate:assets', 'template:css'], function(cb) {
  exec('"./node_modules/.bin/kss-node" --config "./kss-config.json"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
//Copy styleguide assets
.task('tempate:assets', ['tempate:copy'], function() {
  return gulp.src(['./src/img/**', './src/js/**'])
    .pipe(gulp.dest('./build/template/public'));
})
//Generate the styleguide
.task('styleguide', ['styleguide:create']);