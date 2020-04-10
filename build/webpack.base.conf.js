const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
    context: resolvePath(''),
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
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}