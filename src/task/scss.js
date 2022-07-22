import gulp from "gulp";
import path from "../../config/path.js";

//Plugins
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import gcmq from "gulp-group-css-media-queries";
import { isDev } from "../../config/app.js";
import sass from "gulp-sass";
import gulpif from "gulp-if";

//SCSS processing
const scss = () => {
  return gulp
    .src(path.scss.src, { sourcemaps: isDev })
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
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: isDev }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: isDev }));
};

export default scss;
