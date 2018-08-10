var del = require('del');
var gulp = require('gulp');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var header = require('gulp-header');
var browserSync = require('browser-sync');

var license = '/*\n' +
	' * Project: vMenu\n' +
	' * Description: Mobile friendly jQuery menu dropdown style plugin\n' +
	' * Author: https://github.com/Wancieho\n' +
	' * License: MIT\n' +
	' * Version: 0.1.0\n' +
	' * Dependancies: jquery-3.*\n' +
	' */\n';

gulp.task('clean', function () {
	return del([
		'dist',
		'demo/src'
	]);
});

gulp.task('jquery', function () {
	return gulp.src('node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('demo/src/js'));
});

gulp.task('build', function () {
	gulp.src('source/less/vmenu.less')
		.pipe(less())
		.pipe(minify({ compatibility: 'ie8' }))
		.pipe(rename('vmenu.min.css'))
		.pipe(gulp.dest('dist/css'));

	gulp.src('source/js/jquery.vmenu.js')
		.pipe(strip())
		.pipe(header(license))
		.pipe(gulp.dest('dist/js'));

	return gulp.src('source/js/jquery.vmenu.js')
		.pipe(uglify())
		.pipe(header(license))
		.pipe(rename('jquery.vmenu.min.js'))
		.pipe(gulp.dest('dist/js'));
});

// #TODO: not working
gulp.task('browserSync', function (done) {
	browserSync.reload();

	done();
});

gulp.task('serve', gulp.series('clean',
	gulp.parallel(
		'jquery',
		'build'
	)
));

gulp.task('default', gulp.series('serve'), function () {
	browserSync.init({
		server: {
			baseDir: 'demo/'
		}
	});
});

gulp.task('watch', function () {
	gulp.watch(['source/**/*'], gulp.series(['build', 'browserSync']));
});