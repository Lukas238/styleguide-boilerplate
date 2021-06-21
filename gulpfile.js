var gulp = require("gulp"),
  { src, dest, series, parallel } = require("gulp"),
  sass = require("gulp-sass"),
  sassGlob = require("gulp-sass-glob"),
  // cssnano = require("gulp-cssnano");
  // (sourcemaps = require("gulp-sourcemaps")),
  log = require("fancy-log"),
  gulpif = require("gulp-if"),
  plumber = require("gulp-plumber"),
  kss = require("kss"),
  kssOptions = require("./kss.json");
livereload = require("gulp-livereload");

var cfg = {
  src: "./src",
  dist: "./dist",
};

var onError = function (error) {
  log.error(error.message);
  this.emit("end");
};

function scss() {
  return (
    gulp
      .src(cfg.src + "/scss/**/*.scss")
      .pipe(
        plumber({
          errorHandler: onError,
        })
      )
      // .pipe(sourcemaps.init())
      .pipe(sassGlob())
      .pipe(
        sass({
          includePaths: ["./node_modules/bootstrap-sass/assets/stylesheets"],
          errLogToConsole: true,
        })
      )
      // .pipe(
      //   cssnano({
      //     autoprefixer: {
      //       browsers: ["last 2 versions", "ie >= 8", "ios 8"],
      //       add: true,
      //     }
      //   })
      // )
      // .pipe(sourcemaps.write("./"))
      .pipe(dest(cfg.dist + "/css"))
      .pipe(livereload())
  );
}

function styleguide() {
  return kss(kssOptions);
}
styleguide.description = "Build the style guide with KSS";

function watch() {
  livereload.listen();
  gulp.watch(cfg.src + "/scss/**/*.scss", scss);
}

// DEFAULT
exports.default = series(scss, styleguide);

exports.watch = series(scss, watch);
