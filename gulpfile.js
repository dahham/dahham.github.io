const gulp = require('gulp')
const sass = require('gulp-sass')

gulp.task('default', ['styles'], () => {
  gulp.watch('debug/sass/*.scss', ['styles']);
})

gulp.task('styles', () => {
  gulp.src('debug/sass/*.scss').pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('css'))
})