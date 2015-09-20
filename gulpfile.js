var gulp = require('gulp');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');
var nodemon = require('gulp-nodemon');

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-client', ['move-client'], function() {
	return gulp.src(['src/client/js/app.js'])
	//.pipe(webpack(require('./webpack.config.js')))
	.pipe(gulp.dest('./bin/client/js/'));
});

gulp.task('move-client', function() {
	return gulp.src(['src/client/**/*.*', '!client/js/*.js'])
	.pipe(gulp.dest('./bin/client/'));
});

gulp.task('build-server', function() {
	return gulp.src(['src/server/**/*.*', 'src/server/**/*.js'])
	//.pipe(babel())
	.pipe(gulp.dest('./bin/server/'));
});

gulp.task('run', ['build'], function() {
	nodemon({
		script: './server/server.js',
		cwd: './bin/',
		ext: 'html js css'
	});
});
