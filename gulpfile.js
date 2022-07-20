const { watch, parallel, series } = require("gulp");
const browserSync = require("browser-sync").create();
const path = require("./config/path.js");

//Listener
const watcher = () => {
  watch(path.html.watch, html).on("all", browserSync.reload);
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
exports.watch = watcher;

//Bundler
exports.dev = series(clear, html, parallel(watcher, server));
