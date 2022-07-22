import del from "del";
import path from "../../config/path.js";

// Clear public dir
const clear = () => {
  return del(path.root);
};

export default clear;
