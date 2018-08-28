const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

gulp.task('default', ['styles', 'copy-html'], () => {
  gulp.watch('debug/sass/*.scss', ['styles']);
  gulp.watch('debug/*.html', ['copy-html'])

  browserSync.init({
    server: ''
  })

})

gulp.task('styles', () => {
  gulp.src('debug/sass/*.scss').pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
})

gulp.task('copy-html', () => {
  gulp.src('debug/*.html').pipe(gulp.dest(''))
})