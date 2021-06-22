var gulp = require('gulp'),
  { src, dest, series, parallel } = require('gulp'),
  clean = require('gulp-rimraf'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  log = require('fancy-log'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync').create(),
  kss = require('kss'),
  kssOptions = require('./kss.json');

var cfg = {
  src: './src',
  dist: './dist',
};

var onError = function (error) {
  log.error(error.message);
  this.emit('end');
};


// CLEAN Working Folder
function clean_dist(done) {
  return src(cfg.dist + '/*', {
    read: false
  }).pipe(clean());
}

function scss() {
  return (
    gulp
      .src([
        cfg.src + '/scss/**/*.scss',
        '!'+cfg.src + '/scss/kss_custom_toc.scss'
      ])
      .pipe(
        plumber({
          errorHandler: onError,
        })
      )
      .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets'],
          errLogToConsole: true,
        })
      )
      .pipe(dest(cfg.dist + '/css'))
      .pipe(browserSync.stream())
  );
}
const styleguide = function(){
  return kss(kssOptions);
};

// Static server
const serve = function(cb) {
  browserSync.init({
      server: {
          baseDir: cfg.dist
      }
  });
  cb();
};

function browsersyncReload(cb){
  browserSync.reload();
  cb();
}

function watch() {
  gulp.watch([cfg.src + '/scss/**/*.scss', cfg.src + '/components/**/*.html'], series(scss, styleguide, browsersyncReload));
}

// DEFAULT
exports.default = series(clean_dist, scss, styleguide, serve, watch);
exports.build = series(clean_dist, scss, styleguide);
