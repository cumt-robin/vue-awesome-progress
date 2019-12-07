const path = require("path")
const webpack = require("webpack")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cssLoader = {
    loader: 'css-loader'
}

const vueLoaderOptions = {
    loaders: [cssLoader],
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href']
    }
}

function resolvePath(dir) {
    return path.join(__dirname, "..", dir)
}

module.exports = {
    mode: 'development',
    context: resolvePath('src'),
    entry: [
        "core-js/modules/es.promise",
        "core-js/modules/es.array.iterator",
        './main.js'
    ],
    output: {
        path: resolvePath('dist'),
        filename: "[name].js",
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
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            '@': resolvePath('src')
        },
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            { 
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderOptions 
            },
            { 
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    resolvePath("src")
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: '很棒的vue进度条组件',
            // 模板，推荐ejs
            template: resolvePath('index.html'),
            // 最终写入的目标文件
            filename: 'index.html'
        })
    ]
}