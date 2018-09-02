const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const eslint = require('gulp-eslint')
const responsiveImages = require('gulp-responsive-images');

gulp.task('default', ['styles', 'lint', 'copy-html', 'copy-data', 'responsive-images'], () => {
  gulp.watch('debug/sass/*.scss', ['styles']);
  gulp.watch('debug/*.html', ['copy-html']);
  gulp.watch('debug/js/*.js', ['lint']);

  browserSync.init({
    server: ''
  });
});

gulp.task('styles', () => {
  gulp.src('debug/sass/*.scss').pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
});

gulp.task('copy-html', () => {
  gulp.src('debug/*.html').pipe(gulp.dest(''))
});

gulp.task('copy-data', () => {
  gulp.src('debug/data/*').pipe(gulp.dest('data'));
});

gulp.task('lint', () => {
  return gulp.src('debug/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest('scripts'));
});

gulp.task('responsive-images', () => {
  gulp.src('debug/img/*.png')
    .pipe(responsiveImages({
      'favicon.png': {
        width: 24,
        height: 24,
      },
      'logo': {
        width: 800,
        height: 300,
        crop: true
      }
    }))
    .pipe(gulp.dest('img'));
});