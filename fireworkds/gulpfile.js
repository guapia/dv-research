
var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {

    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({

            noImplicitAny: false,
            out: 'fireworkds.js',
            sourceMap: true,
            target: "es5"
        }));

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dst'));
});