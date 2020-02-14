// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/element-checklist/" : "/",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
// configureWebpack: {
//   plugins: [
//     new MonacoWebpackPlugin({
//       // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
//       languages: ['javascript', 'css', 'html', 'typescript', 'json']
//     })
//   ]
// }
