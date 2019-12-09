// .eslintrc.js
module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        "parser": "babel-eslint",
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    plugins: [
        "vue"
    ],
    extends: [
      "plugin:vue/essential"
    ],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    }
}