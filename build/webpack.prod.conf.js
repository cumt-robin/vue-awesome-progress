const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

function resolvePath(dir) {
    return path.join(__dirname, "..", dir)
}

const buildConfig = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        'vue-awesome-progress': './src/components/index.js'
    },
    output: {
        path: resolvePath('dist'),
        publicPath: '/',
        filename: '[name].js',
        library: 'VueAwesomeProgress',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: false
    }
})

if (process.env.report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    buildConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = buildConfig