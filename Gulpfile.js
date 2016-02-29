var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var open = require('opn');

gulp.task('test', function(){
    console.log('opening tests/index.html');
    open('./tests/index.html',{ app: 'chrome' });
});

gulp.task('es6', function() {
	browserify({
    	entries: 'src/rss.js',
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

gulp.task('dist', function() {
  return browserify('./src/RSS.js',{
        standalone: 'RSS'
    })
    .transform(babelify)
    .bundle()
    .pipe(source('rss.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

//gulp.task('default', ['es6']);

gulp.task('default', ['dev','dist']);