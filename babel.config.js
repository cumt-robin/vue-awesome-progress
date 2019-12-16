const buildConfig = {
    presets: [
        [
            "@babel/preset-env",
            {
                loose: false,
                modules: false,
                useBuiltIns: false
            }
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
}

const devConfig = {
    presets: [
        [
            "@babel/preset-env",
            {
                loose: false,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
                }
            }
        ]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import" // 这是配合路由懒加载的插件
    ]
}

module.exports = (process.env.NODE_ENV === 'development' || process.env.IS_DEMO) ? devConfig : buildConfig