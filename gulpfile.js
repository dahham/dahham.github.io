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
  gulp.src('debug/img/*')
    .pipe(responsiveImages({
      '*_promotional.png': [{
        width: 600,
        height: 300,
        suffix: '-large'
      }, {
        width: 400,
        height: 200,
        suffix: '-medium'
      }, {
        width: 200,
        height: 100,
        suffix: '-small'
      }, {
        width: 100,
        height: 50,
        suffix: '-thumbnail'
      }],
      'logo_background.png': [{
        width: 1000,
        height: 500,
        suffix: '-large'
      }, {
        width: 500,
        height: 250,
        suffix: '-medium'
      }, {
        width: 200,
        height: 100,
        suffix: '-small'
      }]
    }))
    .pipe(gulp.dest('img'));
});