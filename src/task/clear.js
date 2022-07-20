const del = require("del");

// Clear public dir
const clear = () => {
  return del("./public");
};

module.exports = clear;
