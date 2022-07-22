import gulp from "gulp";
import path from "../../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import babel from "gulp-babel";
import webpack from "webpack-stream";
import { isProd, isDev } from "../../config/app.js";

//JavaScript processing
const js = () => {
  return gulp
    .src(path.js.src, { sourcemaps: isDev })
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
    .pipe(gulp.dest(path.js.dest, { sourcemaps: isDev }));
};

export default js;
