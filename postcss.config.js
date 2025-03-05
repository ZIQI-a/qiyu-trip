// postcss.config.js
// 启用嵌套语法支持
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375,
        },
        "postcss-preset-env": {
            features: { "nesting-rules": true }
        }
    },
};