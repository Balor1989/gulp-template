const { src, dest, watch, parallel, series } = require("gulp");

//Plugins
const size = require("gulp-size");
const htmlmin = require("gulp-htmlmin");
const include = require("gulp-file-include");

//HTML processing
const html = () => {
  return src("./src/html/*.html")
    .pipe(include())
    .pipe(size({ title: "before minimize" }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size({ title: "after minimize" }))
    .pipe(dest("./ public"));
};

//Listener
const listener = () => {
  watch("./src/**/*.html", html);
};

//Tasks
exports.html = html;
exports.watch = listener;

//Bundler
exports.dev = series(html, listener);