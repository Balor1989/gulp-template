import gulp from "gulp";
import path from "../../config/path.js";

//Plugins
import size from "gulp-size";
import htmlmin from "gulp-htmlmin";
import include from "gulp-file-include";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import { isProd } from "../../config/app.js";

//HTML processing
const html = () => {
  return gulp
    .src(path.html.src)
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
    .pipe(gulp.dest(path.html.dest));
};

export default html;
