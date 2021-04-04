const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: '/',
        filename: "[name].bundle.js",
        publicPath: '/'
    },
    devServer: {
        port: 8080,
        open: true,
        hot: true,
        historyApiFallback: true,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue-awesome-progress',
            // 模板，支持ejs
            template: 'index.html',
            // 最终写入的目标文件
            filename: 'index.html',
            favicon: 'favicon.ico'
        })
    ]
})