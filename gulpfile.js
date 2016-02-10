'use strict';

var gulp         = require('gulp');
var wiredep      = require('gulp-wiredep');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var gulp_concat  = require('gulp-concat');
var browserSync  = require('browser-sync').create();

gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    gulp.src('scripts/**/*.js')
        .pipe(plumber())
        .pipe(gulp_concat('scripts.js'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('vendor-scripts', function() {
    gulp.src('vendor/**/*.js')
        .pipe(plumber())
        .pipe(gulp_concat('vendor.js'))
        .pipe(gulp.dest('.tmp/vendor'))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
})

gulp.task('default', [ 'vendor-scripts', 'sass', 'scripts' ]);

gulp.task('serve', [ 'vendor-scripts', 'sass', 'scripts' ], function() {
    browserSync.init({
        server: "."
    });

    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('sass/**/*.scss', [ 'sass' ]);
    gulp.watch('scripts/**/*.js', [ 'scripts' ]).on('change', browserSync.reload);
    gulp.watch('vendor/**/*.js', [ 'vendor-scripts' ]).on('change', browserSync.reload);;
});