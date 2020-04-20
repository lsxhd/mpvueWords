// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // devServer: {
	// 	proxy: {
	// 		'/vpa/tmp': {
	// 			target: 'http://localhost:8000/mock',

	// 			changeOrigin: true
	// 		},
	// 		'/vpa': {
	// 			// target: "http://172.31.223.250:8769",
	// 			target: 'http://172.31.198.24:18769',
	// 			// target: "http://172.31.198.24:8769",
	// 			ws: true,
	// 			changeOrigin: true
	// 		},
	// 		'vpa/skill': {
	// 			// target: 'http://172.31.223.250:8086', // 开发
	// 			target: 'http://172.31.198.24:18086', // 测试
	// 			// target: 'http://aiuiweb.xfyun.cn', // 灰度
	// 			// target: 'http://aquadev.iflytekauto.cn', // 现网
	// 			// target: 'http://10.5.120.131:9090', // 张昊
	// 			// target: 'http://10.5.120.118:9090', // 肖行镇
	// 			changeOrigin: true
	// 		}
	// 	}
	// },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    // 在小程序开发者工具中不需要自动打开浏览器
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
