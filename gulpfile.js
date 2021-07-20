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
  dev: './dev',
  dist: './dist',
};

cfg.wf = cfg.dev; // Sets the default working folder

var onError = function (error) {
  log.error(error.message);
  this.emit('end');
};

function set_wf_dev(done) {
  cfg.wf = cfg.dev;
  done();
}

function set_wf_dist(done) {
  cfg.wf = cfg.dist;
  done();
}

function clean_wf(done) {
  return src(cfg.wf + '/*', {
    read: false,
  }).pipe(clean());
}

function images() {
  return src(cfg.src + '/img/*').pipe(dest(cfg.wf + '/img'));
}

function scss() {
  return gulp
    .src([cfg.src + '/scss/**/*.scss', '!' + cfg.src + '/scss/kss_custom_toc.scss'])
    .pipe(
      plumber({
        errorHandler: onError,
      })
    )
    .pipe(sassGlob())
    .pipe(
      sass({
        includePaths: [
          './node_modules/bootstrap-sass/assets/stylesheets' // remove if bootstrap is not used
        ],
        errLogToConsole: true,
      })
    )
    .pipe(dest(cfg.wf + '/css'))
    .pipe(browserSync.stream());
}
const styleguide = series(images, function () {
  kssOptions.destination = cfg.wf;
  return kss(kssOptions);
});

// Static server
const serve = function (cb) {
  browserSync.init({
    server: {
      baseDir: cfg.wf,
    },
  });
  cb();
};

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function watch() {
  gulp.watch([cfg.src + '/scss/**/*.scss', cfg.src + '/components/**/*.html', cfg.src + '/homepage.md'], series(scss, styleguide, browsersyncReload));
}

// DEFAULT
exports.default = series(set_wf_dev, clean_wf, scss, styleguide, serve, watch);
exports.build = series(set_wf_dist, clean_wf, scss, styleguide);
