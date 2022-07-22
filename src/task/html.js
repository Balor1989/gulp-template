const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const size = require("gulp-size");
const htmlmin = require("gulp-htmlmin");
const include = require("gulp-file-include");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const { isProd } = require("../../config/app.js");

//HTML processing
const html = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "HTML",
          message: error.message,
        })),
      })
    )
    .pipe(include())
    .pipe(size({ title: "before minimize" }))
    .pipe(htmlmin({ collapseWhitespace: isProd }))
    .pipe(size({ title: "after minimize" }))
    .pipe(dest(path.html.dest));
};

module.exports = html;
