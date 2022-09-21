const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false ,//关闭语法检查,
  devServer: {
    host: "localhost",
    port: '8989',
    https: false,
    hot: true,
    proxy: {
      //基准地址是一个变量所以要用中括号包裹，process.env能访问.env文件的内容
     [process.env.VUE_APP_BASES_API ]: {
        //让target地址映射到基准地址上
            target: process.env.VUE_APP_SERVICE_URL, //API服务器的地址
            // ws: true, //代理websockets
            changeOrigin: true, // 虚拟的站点需要更管origin
            pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
              ["^" + process.env.VUE_APP_BASES_API]: ''
            }
        },
    },
}
});
