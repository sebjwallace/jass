var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', ['dev','dist']);

gulp.task('dev', function() {
  return browserify('./src/ReactRSS.js')
    .transform(babelify)
    .bundle()
    .pipe(source('react-rss.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', function() {
  return browserify('./src/ReactRSS.js')
    .transform(babelify)
    .bundle()
    .pipe(source('react-rss.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});