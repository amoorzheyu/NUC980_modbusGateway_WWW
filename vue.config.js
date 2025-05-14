const {
  defineConfig
} = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackObfuscator  = require('webpack-obfuscator');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": { // “/api” 以及前置字符串会被替换为真正域名
        target: "http://192.168.3.30:80", // 请求域名
        secure: false, // 请求是否为https
        changeOrigin: true, // 是否跨域
        ws: true,
        logLevel: 'debug',  // 打印详细代理日志
        rewrite: (path) =>path.replace(/^\/api/, "")
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.(js|css|html|svg)$/, // 需要压缩的文件类型
        algorithm: 'gzip', // 压缩算法，默认是 'gzip'
        filename: '[path][base].gz', // 压缩后的文件名
        minRatio: 0.8, // 仅压缩比例大于等于 0.8 的文件
        threshold: 10240, // 文件大小超过 10KB 才会被压缩
        deleteOriginalAssets: false // 是否删除原始文件
      }),
      //低混淆
      // new WebpackObfuscator({
      //   // 压缩代码
      //   compact: true,
      //   // 是否启用控制流扁平化(降低1.5倍的运行速度)
      //   controlFlowFlattening: false,
      //   // 随机的死代码块(增加了混淆代码的大小)
      //   deadCodeInjection: false,
      //   // 此选项几乎不可能使用开发者工具的控制台选项卡
      //   debugProtection: true,
      //   // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
      //   debugProtectionInterval: 1,
      //   // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
      //   disableConsoleOutput: true,
      //   // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
      //   identifierNamesGenerator: 'mangled',
      //   log: false,
      //   // 是否启用全局变量和函数名称的混淆
      //   renameGlobals: false,
      //   // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
      //   rotateStringArray: false,
      //   // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
      //   selfDefending: false,
      //   // 删除字符串文字并将它们放在一个特殊的数组中
      //   stringArray: true,
      //   //这里是网上复制来的代码改的，不然会报错，具体报错看下面的贴的！！！！！！！！！！！！！！！！！！！
      //   // stringArrayEncoding: false,
      //   stringArrayEncoding: ['base64'],
      //   stringArrayThreshold: 0.75,
      //   // 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
      //   unicodeEscapeSequence: false
      // }, []),
    ],

  }
})