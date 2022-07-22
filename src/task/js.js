const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const babel = require("gulp-babel");
const webpack = require("webpack-stream");
const { isProd, isDev } = require("../../config/app.js");

//JavaScript processing
const js = () => {
  return src(path.js.src, { sourcemaps: isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "JavaScript",
          message: error.message,
        })),
      })
    )
    .pipe(babel())
    .pipe(webpack({ mode: isProd ? "production" : "development" }))
    .pipe(dest(path.js.dest, { sourcemaps: isDev }));
};

module.exports = js;
