import gulp from "gulp";
import path from "../../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import imagemin from "gulp-imagemin";
import newer from "gulp-newer";
import gulpif from "gulp-if";
import { isProd } from "../../config/app.js";

//Image processing
const img = () => {
  return gulp
    .src(path.img.src)
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
    .pipe(gulp.dest(path.img.dest));
};

export default img;
