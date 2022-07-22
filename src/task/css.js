const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cssimport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");
const gulpif = require("gulp-if");
const { isDev, isProd } = require("../../config/app.js");

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
    .pipe(cssimport())
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(gulpif(isProd, csso()))
    .pipe(dest(path.css.dest, { sourcemaps: isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(dest(path.css.dest, { sourcemaps: isDev }));
};

module.exports = css;
