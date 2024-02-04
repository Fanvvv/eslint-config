module.exports = {
    extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "@fanv/eslint-config-ts",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "jsx-quotes": [
            "error",
            "prefer-double", // 首选双引号
        ],
        "react/react-in-jsx-scope": "off", // 是否设置使用JSX时不允许不导入React
    },
}
