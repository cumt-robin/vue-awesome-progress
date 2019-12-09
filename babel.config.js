const config = {
    presets: [
        [
          "@babel/preset-env",
          {
            loose: false,
            modules: false,
            useBuiltIns: 'usage',
            corejs: 3
          }
        ]
    ],
    plugins: [
        "@babel/plugin-syntax-dynamic-import" // 这是配合路由懒加载的插件
    ]
}

module.exports = config