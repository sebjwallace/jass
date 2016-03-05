var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');

gulp.task('es6', function() {
	browserify({
    	entries: 'src/RSS.js',
    	debug: true
  	})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(''));
});

gulp.task('dev', function() {
  return gulp.src('src/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('rss.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

//gulp.task('default', ['es6']);

gulp.task('default', ['dev']);