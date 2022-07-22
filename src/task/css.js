import gulp from "gulp";
import path from "../../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import cssimport from "gulp-cssimport";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import gcmq from "gulp-group-css-media-queries";
import gulpif from "gulp-if";
import { isDev, isProd } from "../../config/app.js";

//CSS processing
const css = () => {
  return gulp
    .src(path.css.src, { sourcemaps: true })
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
    .pipe(gulp.dest(path.css.dest, { sourcemaps: isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(gulp.dest(path.css.dest, { sourcemaps: isDev }));
};

export default css;
