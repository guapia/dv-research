
var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var merge = require('merge2');

gulp.task('default', function () {

    var tsResult = gulp.src('android/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({

            noImplicitAny: false,
            out: 'android.js',
            sourceMap: true,
            target: "es5",
            declaration: true
        }));

    return merge([
        // tsResult.dts.pipe(gulp.dest('')),
        tsResult.dts.pipe(gulp.dest('../chart_core/dst/')),
        tsResult.js.pipe(sourcemaps.write())
        .pipe(gulp.dest('')),
        tsResult.js
        // .pipe(sourcemaps.write())
        // .pipe(uglify())
        .pipe(gulp.dest('../chart_core/dst/')),


        tsResult.dts.pipe(gulp.dest('../demosite/public/javascripts/')),
        // tsResult.js.pipe(sourcemaps.write())
        // .pipe(gulp.dest('')),
        tsResult.js
        // .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('../demosite/public/javascripts/')),


        tsResult.dts.pipe(gulp.dest('../faitest/libs/')),
        // tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('')),
        tsResult.js
        // .pipe(sourcemaps.write())
        // .pipe(uglify())
        .pipe(gulp.dest('../faitest/libs/')),

        tsResult.dts.pipe(gulp.dest('../fireworkds/libs/')),
        // tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('')),
        tsResult.js
        // .pipe(sourcemaps.write())
        // .pipe(uglify())
        .pipe(gulp.dest('../fireworkds/libs/')),
        
        // tsResult.js.pipe(sourcemaps.write()).pipe(gulp.dest('../wonderful_moment/dst/')),
        // tsResult.dts.pipe(gulp.dest('../wonderful_moment/dst/')),
        
        // tsResult.dts.pipe(gulp.dest('dst')),
        // tsResult.dts.pipe(gulp.dest('../chartsample/public/javascripts/')),

        // tsResult.js.pipe(sourcemaps.write())
        //     .pipe(gulp.dest('dst')),
        // tsResult.js.pipe(sourcemaps.write())
        //     .pipe(gulp.dest('../chartsample/public/javascripts/'))

    ]);
});

