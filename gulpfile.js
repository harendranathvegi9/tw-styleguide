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
})
//Create styleguide
.task('styleguide:create', ['clean:build', 'less'], function(cb) {
  exec('"./node_modules/.bin/kss-node" --config "./kss-config.json"', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})
//Copy styleguide assets
.task('styleguide:copy', ['styleguide:create'], function() {
  return gulp.src(['./build/css/*.*', './src/img/*.*', './src/js/*.*'])
    .pipe(gulp.dest('./styleguide/public'));
})
//Generate the styleguide
.task('styleguide', ['styleguide:create', 'styleguide:copy']);