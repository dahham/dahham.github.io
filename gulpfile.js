const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['styles'], () => {
  gulp.watch('debug/sass/*.scss', ['styles']);
})

gulp.task('styles', () => {
  gulp.src('debug/sass/*.scss').pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css'))
})