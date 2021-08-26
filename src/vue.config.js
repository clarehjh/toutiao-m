module.exports = {
  dev: {
    host: '127.0.0.1',
    port: 8081,
    // Paths
    proxyTable: {
      '/api':{
        target:'http://ttapi.research.itcast.cn/', 
        changeOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  }