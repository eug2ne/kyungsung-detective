const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new ForkTsCheckerWebpackPlugin({ 
        typescript: { memoryLimit: 4096, configFile: './tsconfig.json' }
      })
    ]
  },
  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    const rules = [
      { name: 'images', dir: 'img' },
      { name: 'media',  dir: 'media' }
    ]
    rules.forEach(rule => {
      const ruleConf = config.module.rule(rule.name)

      ruleConf.uses.clear()

      ruleConf
        .use('file-loader')
          .loader('file-loader')
          .options({
            name: `${rule.dir}/[name].[hash:8].[ext]`
          })
    })

    config.module
      .rule('typescript')
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true, // Enable transpileOnly mode for faster type checking
        happyPackMode: false, // Disable happyPack mode to use fork-ts-checker-webpack-plugin
      });
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