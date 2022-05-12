// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 公共路径
  publicPath: "./",
  // 打包路径
  outputDir: "dist",
  // 静态资源路径
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false, // 不需要生产环境的 source map 设置false（减小dist文件大小，加速构建）
  devServer: {
    proxy: {
      "/": {
        target: process.env.VUE_APP_BASE_API,
        // ws:true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: () => {
    const webpackConfigure = {
      performance: {
        hints: "warning",
        //入口起点的最大体积 整数类型（以字节为单位）
        maxEntrypointSize: 50000000,
        //生成文件的最大体积 整数类型（以字节为单位 300k）
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
          return assetFilename.endsWith(".js");
        }
      },
      resolve: {
        alias: {
          "@": resolve("src")
        }
      }
    };
    if (process.env.NODE_ENV === "production") {
      return {
        ...webpackConfigure,
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
            deleteOriginalAssets: false // 是否删除原文件
          })
        ]
      };
    }
    return webpackConfigure;
  }
};
