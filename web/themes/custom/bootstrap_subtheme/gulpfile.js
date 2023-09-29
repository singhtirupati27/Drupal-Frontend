const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const srcPath = './scss/**/*.scss';
const destPath = './css';
sass.compiler = require('node-sass');

// Style task.
gulp.task('sass', function () {
  return gulp.src(srcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destPath));
});

// Watch sass task.
gulp.task('sass:watch', function () {
  gulp.watch(srcPath, gulp.series('sass'));
});
