const { src, dest } = require("gulp");
const path = require("../../config/path.js");

//Plugins
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const gulpif = require("gulp-if");
const { isProd } = require("../../config/app.js");

//Image processing
const img = () => {
  return src(path.img.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "Image",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.img.dest))
    .pipe(gulpif(isProd, imagemin({ verbose: true })))
    .pipe(dest(path.img.dest));
};

module.exports = img;
