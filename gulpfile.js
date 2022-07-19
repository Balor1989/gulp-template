const { src, dest, watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const del = require("del");

//Plugins
const size = require("gulp-size");
const htmlmin = require("gulp-htmlmin");
const include = require("gulp-file-include");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

//HTML processing
const html = () => {
  return src("./src/html/*.html")
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          message: error.message,
        })),
      })
    )
    .pipe(include())
    .pipe(size({ title: "before minimize" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ title: "after minimize" }))
    .pipe(dest("./public"))
    .pipe(browserSync.stream());
};

// Clear public dir
const clear = () => {
  return del("./public");
};

//Listener
const listener = () => {
  watch("./src/**/*.html", html);
};

//Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: "./public",
    },
  });
};

//Tasks
exports.html = html;
exports.watch = listener;
exports.clear = clear;

//Bundler
exports.dev = series(clear, html, parallel(listener, server));
