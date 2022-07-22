const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const gcmq = require("gulp-group-css-media-queries");
const { isDev } = require("../../config/app.js");
const sass = require("gulp-sass")(require("sass"));
const gulpif = require("gulp-if");

//SCSS processing
const scss = () => {
  return src(path.scss.src, { sourcemaps: isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "SCSS",
          message: error.message,
        })),
      })
    )
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(gulpif(isProd, csso()))
    .pipe(dest(path.scss.dest, { sourcemaps: isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(dest(path.scss.dest, { sourcemaps: isDev }));
};

module.exports = scss;
