const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concatCss = require("gulp-concat-css");

//CSS processing
const css = () => {
  return src(path.css.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          message: error.message,
        })),
      })
    )
    .pipe(concatCss("bundle.css"))
    .pipe(dest(path.css.dest));
};

module.exports = css;
