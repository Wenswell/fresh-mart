const { defineConfig } = require('@vue/cli-service')

const path = require("path");
const myTheme = path.resolve(__dirname, "./src/assets/styles/vantconfig.less");

module.exports = defineConfig({
  transpileDependencies: true,
  // /usr/share/nginx/html/fresh-mart/client/vue.config.js
  publicPath: '/client/',  //   部署应用包时的基本 URL

  outputDir: 'dist',  //   打包时输出的文件目录

  assetsDir: 'assets',  //   放置静态文件夹目录

  // vant 专用
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            'hack': `true; @import "${myTheme}";`
          },
        },
      },
    },
  },
})
