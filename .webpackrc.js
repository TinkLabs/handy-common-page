export default {
  entry: "src/index.js",
  define: {
    "process.env": {
      aaaaa: 0,
    },
    /*cannot set NODE_ENV for userDefined*/
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.API_ENV": process.env.API_ENV,
    "process.env.APP_ENV": process.env.APP_ENV,
  },
  hash: true,
  html: {
    template: "./src/index.ejs",
  },
  extraBabelPlugins: [
    [
      "import",
      { libraryName: "antd-mobile", libraryDirectory: "es", style: true },
    ],
  ],
};
