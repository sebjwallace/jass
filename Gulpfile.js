var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
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
  return browserify('./src/RSS.js',{
        standalone: 'RSS'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('rss.js'))
    .pipe(gulp.dest('./dist'));
});

//gulp.task('default', ['es6']);

gulp.task('default', ['dev']);