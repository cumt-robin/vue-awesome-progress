const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

function resolvePath(dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        'vue-awesome-progress': './components/index.js'
    },
    output: {
        path: resolvePath('dist'),
        publicPath: '/',
        filename: '[name].js',
        library: 'VueAwesomeProgress',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: false
    }
})