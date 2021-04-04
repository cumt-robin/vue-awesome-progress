/*
 * @Author: 蒋文斌
 * @Date: 2019-12-13 14:23:25
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-04-04 00:37:18
 * @Description: 自动生成
 */
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

module.exports = (process.env.NODE_ENV === 'development' || process.env.IS_EXAMPLE) ? devConfig : buildConfig