'use strict'
var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var path = require('path');

gulp.task('minifyCss', function () {
	gulp.src('src/main/webapp/static/nisum_css/styl*.css')
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('out'));
	});
gulp.task('minifyjs', function () {
	gulp.src('src/main/webapp/js/**/*.js')
	.pipe(jsmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
	  return gulp.src('*.less')
	    .pipe(less({
	      paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
	    .pipe(gulp.dest('./public/css'));
	});

gulp.task('sass', function(){
	  return gulp.src('*.sass')
	    .pipe(sass()) // Using gulp-sass
	    .pipe(gulp.dest('./public/css'))
	});



gulp.task('default',['minifyCss','minifyjs','less','sass']);