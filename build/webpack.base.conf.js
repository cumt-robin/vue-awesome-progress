/*
 * @Author: 蒋文斌
 * @Date: 2020-04-10 14:00:12
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-04 15:35:53
 * @Description: 自动生成
 */
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoaders = [
    process.NODE_ENV === 'development' ? 'vue-style-laoder' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
            esModule: false
        }
    },
    "css-loader",
]

const styleLoaders = [
    {
        test: /\.css$/,
        use: cssLoaders,
    },
    {
        test: /\.s[ac]ss$/,
        use: [
            ...cssLoaders,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    },
];

const vueLoaderOptions = {
    loaders: styleLoaders,
    transformToRequire: {
        video: ["src", "poster"],
        source: "src",
        img: "src",
        image: ["xlink:href", "href"],
        use: ["xlink:href", "href"],
    },
};

function resolvePath(dir) {
    return path.join(__dirname, "..", dir);
}

module.exports = {
    context: resolvePath(""),
    devtool: "source-map",
    resolve: {
        alias: {
            "@": resolvePath("src"),
        },
        extensions: [".js", ".vue", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: vueLoaderOptions,
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [resolvePath("src")],
            },
            ...styleLoaders,
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "static/css/[name].[contenthash].css",
            chunkFilename: "static/css/[name].[contenthash].css",
            ignoreOrder: true,
        }),
    ],
};
