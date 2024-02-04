const { isPackageExists } = require("local-pkg")
// 检查是否安装了 ts 包
const TS = isPackageExists("typescript")
console.log("TS:", TS)

module.exports = {
    overrides: [
        {
            files: ["*.vue"],
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: TS ? "@typescript-eslint/parser" : null,
            },
            rules: {
                "no-unused-vars": "off",
                "no-undef": "off",
                "indent": "off",
                ...(TS
                    ? { "@typescript-eslint/no-unused-vars": "off" }
                    : null),
            },
        },
    ],
    extends: [
        "plugin:vue/vue3-recommended",
        TS
            ? "@fanv/eslint-config-ts"
            : "@fanv/eslint-config-basic",
    ],
    rules: {
        // https://eslint.vuejs.org/rules/
        "vue/max-attributes-per-line": "off", // 强制每行属性的最大数量
        "vue/no-v-html": "off", // 是否禁止使用v-html
        "vue/require-prop-types": "off", // 在props中是否需要类型定义
        "vue/require-default-prop": "off", // 在props是否必须需要默认值
        "vue/multi-word-component-names": "off", // 是否允许注册的组件名称为一个单词
        "vue/prefer-import-from-vue": "off", // 是否必须从`vue`导入，而不是从`@vue/*`导入
        "vue/no-v-text-v-html-on-component": "off", // 是否不允许在组件上使用v-text/v-html
        "vue/no-dupe-keys": "off", // 检查 props / data / methods 中是否出现重复字段名
        // "vue/script-indent": ["error", 4], // 缩进
        // "vue/html-indent": ["error", 4, {
        //     "attribute": 2,
        //     "baseIndent": 2,
        //     "closeBracket": 0,
        //     "alignAttributesVertically": true,
        //     "ignores": []
        // }],

        // reactivity transform
        "vue/no-setup-props-reactivity-loss": "off", // 是否不允许 props 使用解构

        "vue/block-order": ["error", {
            order: ["script", "template", "style"], // SFC 顺序
        }],
        "vue/block-tag-newline": ["error", { // 块级标签换行
            singleline: "always",
            multiline: "always",
        }],
        "vue/component-name-in-template-casing": ["error", "PascalCase"], // 组件命名大驼峰：<CoolComponent>
        "vue/component-options-name-casing": ["error", "PascalCase"], // 组件命名大驼峰：<CoolComponent>
        "vue/custom-event-name-casing": ["error", "camelCase"], // 事件名命名小驼峰
        "vue/define-macros-order": ["error", { // 宏的顺序
            order: ["defineOptions", "defineProps", "defineEmits", "defineSlots"],
        }],
        "vue/html-comment-content-spacing": ["error", "always", {
            exceptions: ["-"], // HTML注释
        }],
        "vue/no-restricted-v-bind": ["error", "/^v-/"], // v-bind指令绑定参数问题
        "vue/no-useless-v-bind": "error", // 禁止不必要的 v-bind 指令
        "vue/no-unused-refs": "error", // 禁止出现使用ref获取组件，但不使用
        "vue/padding-line-between-blocks": ["error", "always"], // 块之间需要空行
        "vue/prefer-separate-static-class": "error", // class属性静态属性和动态属性需要分开写

        // extensions
        "vue/array-bracket-spacing": ["error", "never"], // 在 <template> 中数组括号内需要保持一致的间距
        "vue/arrow-spacing": ["error", { before: true, after: true }], // 强制箭头前后保持一致的间距
        "vue/block-spacing": ["error", "always"], // 块之间的空格
        "vue/brace-style": ["error", "stroustrup", { allowSingleLine: true }], // {}样式
        "vue/comma-dangle": ["error", "always-multiline"], // 最后的逗号
        "vue/comma-spacing": ["error", { before: false, after: true }], // 逗号前后的空格
        "vue/comma-style": ["error", "last"], // 逗号样式
        "vue/dot-location": ["error", "property"], // 点的位置应该与属性部分在同一行
        "vue/dot-notation": ["error", { allowKeywords: true }], // 尽量使用点运算符，少使用中括号[]
        "vue/eqeqeq": ["error", "smart"], // 使用 === 和 !==
        // "vue/func-call-spacing": ["off", "never"],
        "vue/key-spacing": ["error", { beforeColon: false, afterColon: true }], // 冒号前后空格
        "vue/keyword-spacing": ["error", { before: true, after: true }], // 关键字前后空格
        "vue/no-constant-condition": "warn", // 不允许在 <template> 中的条件中使用常量表达式
        "vue/no-empty-pattern": "error", // 不允许空解构
        "vue/no-extra-parens": ["error", "functions"], // 仅不允许在函数表达式周围使用不必要的括号
        "vue/no-irregular-whitespace": "error", // 不允许出现不规则空格编码
        "vue/no-loss-of-precision": "error", // 不允许浮点数转成数字，精度丢失
        "vue/no-restricted-syntax": [ // 不允许使用以下语法
            "error",
            "DebuggerStatement",
            "LabeledStatement",
            "WithStatement",
        ],
        "vue/no-sparse-arrays": "error", // 不允许稀疏数组
        "vue/object-curly-newline": ["error", { multiline: true, consistent: true }], // {}内是否需要换行
        "vue/object-curly-spacing": ["error", "always"], // {} 间距
        "vue/object-property-newline": ["error", { allowMultiplePropertiesPerLine: true }], // 对象的属性不能在同一行
        "vue/object-shorthand": [ // 对象属性和值简写
            "error",
            "always",
            {
                ignoreConstructors: false,
                avoidQuotes: true,
            },
        ],
        "vue/operator-linebreak": ["error", "before"], // 换行后符号的位置
        "vue/prefer-template": "error", // 使用模板字符串而不是字符串拼接
        "vue/quote-props": ["error", "consistent-as-needed"], // 对象属性引号问题
        "vue/space-in-parens": ["error", "never"], // ()内是否需要空格
        "vue/space-infix-ops": "error", // 运算符前后是否需要空格
        "vue/space-unary-ops": ["error", { words: true, nonwords: false }], // 单目运算符前后是否需要空格
        "vue/template-curly-spacing": "error", // 模板字符串中{}内是否需要空格
    },
}