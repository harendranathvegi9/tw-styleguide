var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

//clean build folder
gulp.task('clean:build', function(cb) {
  del(['./build'], cb);
})
//compile less file
.task('less', ['clean:build'], function() {
  return gulp.src('src/less/thoughtworks.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename(function(path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/css'));
});