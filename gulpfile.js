var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    bowerfiles   = require('main-bower-files'),
    cache        = require('gulp-cache'),
    concat       = require('gulp-concat'),
    del          = require('del'),
    flatten      = require('gulp-flatten'),
    filter       = require('gulp-filter'),
    imagemin     = require('gulp-imagemin'),
    jshint       = require('gulp-jshint'),
    livereload   = require('gulp-livereload'),
    minifycss    = require('gulp-minify-css'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    streamqueue  = require('streamqueue'),
    uglify       = require('gulp-uglify');

var included_js_files = [
    'static_src/js/src/**/*.js'];
var included_css_files = [];
var included_font_dirs = ['bower_components/font-awesome/fonts/**'];


/*
 * Sass Task
 *
 * @use
 * $ gulp sass
 *
 * Compiles main.scss into style.css for Wordpress
 */
gulp.task('sass', function() {
	return gulp.src('static_src/scss/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({ browsers: ['> 1%', 'IE 7'], cascade: false }))
		.pipe(sourcemaps.write())
		.pipe(rename({basename: 'app'}))
		//.pipe(minifycss())
		.pipe(gulp.dest('static/css'))
		.pipe(notify({ message: 'SASS Compiled!' }));
});


/*
 * CSS Task
 *
 * @use
 * $ gulp css
 *
 * Copies CSS Files to Dist
 */
gulp.task('css',  function() {
	return gulp.src(included_css_files)
		.pipe(gulp.dest('static/css'))
		.pipe(notify({ message: 'CSS Copied!' }));
});


/*
 * Font Task
 *
 * @use
 * $ gulp fonts
 *
 * Copies Font Files to dist
 */
gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
		    gulp.src(bowerfiles()),
		    gulp.src(included_font_dirs)
		)
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2,otf}'))
        .pipe(flatten())
        .pipe(gulp.dest('static/fonts'));
});


/*
 * JS Task
 *
 * @use
 * $ gulp js
 *
 * Concats all JS files, JSHints and minifies it on main.js
 */
gulp.task('js', function() {
	return gulp.src(included_js_files)
		.pipe(concat('main.js'))
		//.pipe(jshint('.jshintrc'))
		//.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('static/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('static/js'))
		.pipe(notify({ message: 'JS Complete!' }));
});


/*
 * Optimize Task
 *
 * @use
 * $ gulp optimize
 *
 * Optimizes all images
 */
gulp.task('optimize', function() {
	return gulp.src('static_src/img/optimize/**/*')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest('static/img'))
		.pipe(notify({ message: 'Images Optimized!' }));
});


/*
 * Raw Images Task
 *
 * @use
 * $ gulp raw
 *
 * Copies raw images to directory
 */
gulp.task('raw',  function() {
	return gulp.src('static_src/img/raw/**/*')
		.pipe(gulp.dest('static/img'))
		.pipe(notify({ message: 'RAW Images Copied!' }));
});


/*
 * Images Task
 *
 * @use
 * $ gulp images
 *
 * Optimizes and copies images
 */
gulp.task('images', ['raw', 'optimize']);


/*
 * Clean Task
 *
 * @use
 * $ gulp clean
 *
 * Cleans the distribution directory
 */
gulp.task('clean', function(cb) {
	del(['static/css', 'static/js', 'static/images/'], cb)
});


gulp.task('build', ['css', 'sass', 'fonts', 'images', 'js']);


gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('watch', function() {

	livereload.listen();

	gulp.watch('static_src/scss/**/*.scss', ['sass']);
    gulp.watch(included_css_files, ['css']);
	gulp.watch(included_js_files, ['js']);
	gulp.watch(included_font_dirs, ['fonts']);
	gulp.watch('static_src/img/**/*', ['images']);

	gulp.watch(['static/**']).on('change', livereload.changed);
});
