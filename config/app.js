export const isProd = process.argv.includes("--production");
export const isDev = !isProd;
