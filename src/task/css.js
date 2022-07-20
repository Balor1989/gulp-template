const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concatCss = require("gulp-concat-css");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");

//CSS processing
const css = () => {
  return src(path.css.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe(concatCss("main.css"))
    .pipe(cssimport())
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(dest(path.css.dest, { sourcemaps: true }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(dest(path.css.dest, { sourcemaps: true }));
};

module.exports = css;
