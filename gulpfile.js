const { watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const path = require("./config/path.js");

//Listener
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
  watch(path.css.watch, css).on("all", browserSync.reload);
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
exports.watch = watcher;

//Bundler
exports.dev = series(clear, parallel(html, css), parallel(watcher, server));
