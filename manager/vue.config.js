const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/manager/' : '/',
  publicPath: '/manager/',  //   部署应用包时的基本 URL

  // lintOnSave:false, // 关闭eslint
})
