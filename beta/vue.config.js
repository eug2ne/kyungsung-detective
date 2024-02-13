module.exports = {
  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    config.module
      .rule('images')
        .set('parser', {
          dataUrlCondition: {
            maxSize: -1
          }
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