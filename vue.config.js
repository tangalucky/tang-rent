const path = require('path')
 
module.exports = {
  transpileDependencies:['@dcloudio/uni-ui'],
  lintOnSave:false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./static/css/variable.less"),
      ],
    },
  },
  
}