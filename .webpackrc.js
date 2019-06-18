// {
// "extraBabelPlugins": [
//     ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": "css" }]
// ],
// "define": {
//     "process.env": {},
//     "process.env.NODE_ENV": "process.env.NODE_ENV",
//     "process.env.API_ENV": "process.env.API_ENV"
// }
// }

export default {
    entry: "src/index.js",
    define: {
        'process.env': {
            aaaaa: 0
        },
        /*cannot set NODE_ENV for userDefined*/
        'process.env.NODE_ENV': process.env.NODE_ENV,
        'process.env.API_ENV': process.env.API_ENV,
        'process.env.APP_ENV': process.env.APP_ENV
    },
    extraBabelPlugins: [
            ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": true }]
        ]
        // env: {
        //   "development": {
        //     "extraBabelPlugins": [
        //       "dva-hmr"
        //     ]
        //   }
        // },
        // ignoreMomentLocale: true,
        // theme: "./src/theme.js",
        // html: {
        //   "template": "./src/index.ejs"
        // },
        // publicPath: "/",
        // disableDynamicImport: true,
        // hash: true
}