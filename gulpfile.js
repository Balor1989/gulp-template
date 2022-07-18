const { src, dest } = require("gulp");

//Plugins
const size = require("gulp-size");
const htmlmin = require("gulp-htmlmin");
const include = require("gulp-file-include");

//HTML processing
const html = () => {
  return src("./src/html/*.html")
    .pipe(include())
    .pipe(size())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(size())
    .pipe(dest("./ public"));
};

//Tasks
exports.html = html;
