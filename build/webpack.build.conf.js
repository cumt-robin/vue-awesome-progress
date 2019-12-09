const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

function resolvePath(dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: './components/index.js',
    output: {
        path: resolvePath('dist'),
        filename: "vue-awesome-progress.js",
        publicPath: '/'
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: false
    }
})