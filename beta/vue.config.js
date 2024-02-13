module.exports = {
  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    config.module
      .rule('images')
      .test(/\.(png|jpg|gif|svg)$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: `img/[name].[hash:8].[ext]`
      })
  },
  devServer: {
    hot: false
  },
  pages: {
    index: {
      entry: 'src/main.js'
    }
  }
}