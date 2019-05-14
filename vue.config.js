const path = require('path')
const glob = require('glob')
const pages = {}
glob.sync(`${process.cwd()}/src/pages/*/index.ts`).forEach(function(entry) {
  let projectName = /([^/]*)\/index.ts$/.exec(entry)[1]
  pages[projectName] = {
    entry: entry,
    template: 'public/index.html',
    filename: `${projectName}/index.html`
  }
})

console.log(`${JSON.stringify(pages)}`)

module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_rem-calc.scss";`
      }
    },
    sourceMap: true
  },
  pages: pages,
  devServer: {
    proxy: {
      '/loan': {
        target: 'http://192.168.12.12:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/loan/capital/.+': '/finmas/transactionList'
        }
      }
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = '[name]/[name].[chunkhash:8].js'
      config.output.chunkFilename = 'chunk/[id].[chunkhash:8].js'
    }
    // 删除默认值config.entry.app
    delete config.entry.app
  },

  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(args => {
        args[0].filename = '[name]/[name].[contenthash:8].css'
        args[0].chunkFilename = 'chunk/[id].[contenthash:8].css'
        return args
      })
    }

    config.resolve.alias.set('@home', path.resolve('src/pages/home'))
  }
}
