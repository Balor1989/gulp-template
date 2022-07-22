import gulp from "gulp";
import browserSync from "browser-sync";
import path from "./config/path.js";
import { isProd } from "./config/app.js";

//Tasks
import clear from "./src/task/clear.js";
import html from "./src/task/html.js";
import css from "./src/task/css.js";
import js from "./src/task/js.js";
import img from "./src/task/img.js";

//Listener
const watcher = () => {
  gulp.watch(path.html.watch, html).on("all", browserSync.reload);
  gulp.watch(path.css.watch, css).on("all", browserSync.reload);
  gulp.watch(path.js.watch, js).on("all", browserSync.reload);
  gulp.watch(path.img.watch, img).on("all", browserSync.reload);
};

//Server
const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

const build = gulp.series(clear, gulp.parallel(html, css, js, img));
const dev = gulp.series(build, gulp.parallel(watcher, server));

export { clear };
//Bundler
export default isProd ? build : dev;
