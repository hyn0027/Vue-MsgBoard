module.exports = {
  publicPath: '/',
  outputDir: "dist",
  devServer: {
    open: true,
    host: 'localhost',
    port:'8080',
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // 修改为你的Django服务器地址
        ws: true,
        changOrigin: true,
      }
    }
  }
}
