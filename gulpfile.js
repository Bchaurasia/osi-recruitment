'use strict'
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var path = require('path');

gulp.task('lint', function() {
    return gulp.src('src/main/webapp/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});	

gulp.task('minifyCss', function () {
	gulp.src('src/main/webapp/static/**/*.css')
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/main/webapp/dist/static'));
});

gulp.task('minifyjs', function () {
	gulp.src('src/main/webapp/js/**/*.js')
	.pipe(jsmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('src/main/webapp/dist/js'));
});

gulp.task('less', function () {
	  return gulp.src('src/main/webapp/static/**/*.less')
	    .pipe(less({
	      paths: [ path.join(__dirname, 'less', 'includes') ]
	    }))
	    .pipe(gulp.dest('src/main/webapp/dist/static'));
});

gulp.task('sass', function(){
	  return gulp.src('src/main/webapp/static/**/*.sass')
	    .pipe(sass()) // Using gulp-sass
	    .pipe(gulp.dest('src/main/webapp/dist/static'))
});


gulp.task('default',['minifyCss','minifyjs','less','sass']);