'use strict';

var gulp        = require('gulp');
var wiredep     = require('gulp-wiredep');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var uglify      = require('gulp-uglify');
var gulp_concat = require('gulp-concat');

gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('.'));
});

gulp.task('scripts', function() {
    gulp.src('vendor/**/*.js')
        .pipe(gulp_concat('vendor.js'))
        .pipe(gulp.dest('.tmp/vendor'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));

    gulp.src('scripts/**/*.js')
        .pipe(gulp_concat('scripts.js'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('default', [ 'sass', 'scripts' ]);