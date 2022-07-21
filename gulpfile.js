const { watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const path = require("./config/path.js");

//Listener
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.css.watch, css).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.img.watch, img).on("all", browserSync.reload);
};

//Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

//Tasks
const clear = require("./src/task/clear.js");
const html = require("./src/task/html.js");
const css = require("./src/task/css.js");
const scss = require("./src/task/scss.js");
const js = require("./src/task/js.js");
const img = require("./src/task/img.js");
exports.watch = watcher;
exports.scss = scss;
exports.clear = clear;

//Bundler
exports.dev = series(
  clear,
  parallel(html, css, js, img),
  parallel(watcher, server)
);
