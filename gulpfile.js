var gulp = require('gulp');
var browserify = require('browserify');
var nodemon = require('nodemon');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var source = require('vinyl-source-stream');
var imagemin = require('gulp-imagemin');

gulp.task('bundle', function (done) {
  return browserify({
    extensions: ['.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
    entries: './src/js/app.js',
  })
  .bundle()
  .on("error", function (err) {
    console.log("Error : " + err.message);
    this.emit('end');
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
  gulp.src('src/sass/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(cssmin())
  .pipe(gulp.dest('public'));
});

gulp.task('imgmin', () =>
  gulp.src('src/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('public/images'))
);

gulp.task('tpl', function () {
  gulp.src('src/**/*.html')
  .pipe(gulp.dest('public'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: './server.js',
    ext: 'js jade',
    ignore: ['public/*', 'src/*']
  });
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/*.js', ['bundle']);
  gulp.watch('src/**/*.html', ['tpl']);
  gulp.watch('src/images/**.*', ['imgmin']);
});

gulp.task('default', ['nodemon', 'watch']);
