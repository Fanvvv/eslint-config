module.exports = {
    // 支持的环境
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    // 有未使用的禁用指令会提示
    reportUnusedDisableDirectives: true,
    // extends 引入插件的 recommended rules 集合
    extends: [
        "./standard",
        "plugin:import/recommended",
        "plugin:eslint-comments/recommended",
        "plugin:jsonc/recommended-with-jsonc",
        "plugin:yml/standard",
    ],
    // 忽略的文件
    ignorePatterns: [
        "*.min.*",
        "CHANGELOG.md",
        "dist",
        "LICENSE*",
        "output",
        "out",
        "coverage",
        "public",
        "temp",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        "__snapshots__",
        // ignore for in lint-staged
        "*.css",
        "*.png",
        "*.ico",
        "*.toml",
        "*.patch",
        "*.txt",
        "*.crt",
        "*.key",
        "Dockerfile",
        // force include
        "!.github",
        "!.vitepress",
        "!.vscode",
        // force exclude
        "**/.vitepress/cache",
    ],
    plugins: [
        "html", // 用于lint和修复HTML文件中包含的内联脚本
        "unicorn", // 用于提高代码的一致性和可维护性
        "unused-imports", // 查找并删除未使用的es6模块导入
        "@stylistic/js",
    ],
    settings: {
        // 拓展 import resolver 文件类型
        "import/resolver": {
            node: { extensions: [".js", ".mjs", ".ts", ".d.ts"] },
        },
    },
    overrides: [
        {
            // eslint json 文件
            files: ["*.json", "*.json5"],
            parser: "jsonc-eslint-parser",
            rules: {
                // https://ota-meshi.github.io/eslint-plugin-jsonc/rules/
                "jsonc/quotes": ["error", "double"], // 使用双引号
                "jsonc/quote-props": ["error", "always"], // 属性需要加引号
                "jsonc/comma-dangle": ["error", "never"], // 强制在对象和数组文本中一致使用尾随逗号
                "jsonc/comma-style": ["error", "last"], // 在数组文本和对象文本中强制使用一致的逗号样式
                "jsonc/array-bracket-spacing": ["error", "never"], // 数组括号内的间距一致
                "jsonc/key-spacing": ["error", { "beforeColon": false, "afterColon": true }], // 对象文字属性中的键和值之间保持一致的间距
                "jsonc/no-dupe-keys": "error", // 不允许对象文本中存在重复的键
            },
        },
        {
            // eslint yaml 文件
            files: ["*.yaml", "*.yml"],
            parser: "yaml-eslint-parser",
            // https://ota-meshi.github.io/eslint-plugin-yml/rules
            rules: {
                "spaced-comment": ["off"], // 注释 # 开头后的间距保持一致
                "yml/spaced-comment": ["error"],
            }
        },
        {
            // 对 package.json key 排序进行规范
            files: ["package.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: [
                            "publisher",
                            "name",
                            "displayName",
                            "type",
                            "version",
                            "private",
                            "packageManager",
                            "description",
                            "author",
                            "license",
                            "funding",
                            "homepage",
                            "repository",
                            "bugs",
                            "keywords",
                            "categories",
                            "sideEffects",
                            "exports",
                            "main",
                            "module",
                            "unpkg",
                            "jsdelivr",
                            "types",
                            "typesVersions",
                            "bin",
                            "icon",
                            "files",
                            "engines",
                            "activationEvents",
                            "contributes",
                            "scripts",
                            "peerDependencies",
                            "peerDependenciesMeta",
                            "dependencies",
                            "optionalDependencies",
                            "devDependencies",
                            "pnpm",
                            "overrides",
                            "resolutions",
                            "husky",
                            "simple-git-hooks",
                            "lint-staged",
                            "eslintConfig",
                        ],
                    },
                    {
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^resolutions$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^pnpm.overrides$",
                        order: { type: "asc" },
                    },
                    {
                        pathPattern: "^exports.*$",
                        order: [
                            "types",
                            "import",
                            "require",
                            "default",
                        ],
                    },
                ],
            },
        },
        {
            files: ["*.d.ts"],
            rules: {
                "import/no-duplicates": "off", // 关闭导入模块重复项检查
                "unused-imports/no-unused-vars": "off",
                "eslint-comments/no-unlimited-disable": "off",
            },
        },
        {
            files: ["scripts/**/*.*"],
            rules: {
                "no-console": "off",
            },
        },
    ],
    rules: {
        // 根据自己喜好复写 extends rules
        // import
        "import/order": "error", // 按模块导入顺序强制执行约定
        "import/first": "error", // 确保所有导入都出现在其他语句之前
        "import/no-mutable-exports": "error", // 禁止使用带有 var 或 let 的可变导出
        "import/no-unresolved": "off", // 是否仅解析ES6导入
        "import/no-absolute-path": "off", // 是否可以使用绝对路径导入
        "import/newline-after-import": ["error", { count: 1, considerComments: true }], // 导入语句需要空一行，如果有注释可以不空行
        "import/no-self-import": "error", // 禁止模块导入自身
        "import/named": "off", // 是否检测导入和导出的命名是否一致

        // 公共的
        "quotes": ["error", "double"], // 使用双引号
        // "quotes-props": ["error", "consistent-as-needed"], // 如果对象字面量的属性名包含空格、特殊字符，则需要使用引号
        "semi": ["error", "never"], // 不允许在语句末尾使用分号
        "curly": ["error", "multi-or-nest", "consistent"], // 统一的，{}内只包含一行语句，可以省略，其他情况下{}不可以省略
        "no-unused-vars": "warn", // 不允许出现未使用的变量，否则报警告
        "no-param-reassign": "off", // 允许对函数的参数进行重新分配
        "camelcase": "off", // 关闭变量命名检查
        "comma-dangle": ["error", "always-multiline"], // 与 ] 或 } 位于不同行就需要逗号，同行的话就不需要逗号
        "no-constant-condition": "warn", // 条件判断中不允许使用常量表达式
        "no-debugger": "error", // 禁止使用 debugger，使用后要及时删除
        "no-console": ["error", { allow: ["warn", "error"] }], // 允许使用 console.warn 和 error
        "no-cond-assign": ["error", "always"], // 不允许在条件表达式中使用赋值运算符
        "no-restricted-syntax": [
            "error",
            "DebuggerStatement",
            "LabeledStatement",
            "WithStatement",
        ], // 禁止使用debugger、标签语句和with语句
        "no-return-await": "off", // 关闭不允许不必要的 return await
        "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 1 }], // 最多只能有一个连续空行，文件开头和文件结尾的最大空行数

        // Stylistic
        "@stylistic/js/array-bracket-spacing": ["error", "never"], // 不允许数组括号内有空格，逗号分隔可以有
        "@stylistic/js/block-spacing": ["error", "always"], // {}需要空格
        "@stylistic/js/comma-spacing": ["error", { before: false, after: true }], // 逗号前后是否需要空格
        "@stylistic/js/func-call-spacing": "off", // 函数标识符和调用之间不可以存在间距
        "@stylistic/js/generator-star-spacing": "off", // 是否开启生成器函数中强制 * 运算符周围保持一致的间距
        "@stylistic/js/indent": ["error", 4, { SwitchCase: 2, VariableDeclarator: 2, outerIIFEBody: 2 }], // 缩进
        "@stylistic/js/key-spacing": ["error", { beforeColon: false, afterColon: true }], // 对象冒号的左右间距
        "@stylistic/js/no-multi-spaces": "error", // 用于检查代码中是否使用了多个空格
        "@stylistic/js/object-curly-spacing": ["error", "always"], // 大括号内需要间距
        "@stylistic/js/operator-linebreak": ["error", "before"], // 用于检查操作符是否一致，是否在行首或行尾
        "@stylistic/js/template-curly-spacing": "error", // 要求或不允许模板字符串的嵌入表达式之间有间距
        "@stylistic/js/brace-style": ["error", "stroustrup", { "allowSingleLine": true }], // {}样式 https://eslint.org/docs/latest/rules/brace-style#rule-details
        "@stylistic/js/comma-style": ["error", "last"], // 逗号样式
        "@stylistic/js/space-before-function-paren": [
            "error",
            {
                anonymous: "always", // 匿名函数需要空格 function () {}
                named: "never", // 命名函数不需要空格 function foo() {}
                asyncArrow: "always", // 箭头函数需要空格 () => {}
            },
        ],
        "@stylistic/js/spaced-comment": ["error", "always", { // 注释后面必须至少有一个空格
            line: {
                markers: ["/"],
                exceptions: ["/", "#"],
            },
            block: {
                markers: ["!"],
                exceptions: ["*"],
                balanced: true,
            },
        }],

        // ES6
        "no-var": "error", // 禁止使用var声明变量
        "prefer-const": [
            "error",
            {
                destructuring: "any", // 对于声明后从不重新分配的变量，需要 const 声明
                ignoreReadBeforeAssign: true, // 忽略声明，可以使用 let 进行声明再赋值
            },
        ],
        "prefer-arrow-callback": [
            "error",
            {
                allowNamedFunctions: false, // 是否禁止使用命名函数作为回调或函数参数
                allowUnboundThis: true, // 是否允许包含 this 的函数表达式用作回调
            },
        ],
        "object-shorthand": [
            "error",
            "always", // 尽可能使用对象属性的简写方法
            {
                ignoreConstructors: false, // 是否忽略对构造函数的检测
                avoidQuotes: true, // 避免使用引号
            },
        ],
        "prefer-exponentiation-operator": "error", // 不允许使用 Math.pow 而使用 ** 运算符
        "prefer-rest-params": "error", // 需要剩余参数(rest参数)而不是 arguments
        "prefer-spread": "error", // 需要扩展运算符而不是 .apply()
        "prefer-template": "error", // 需要模板字符串，而不是字符串拼接
        "arrow-parens": [
            "error",
            "as-needed", // 按需要判断箭头函数参数是否需要括号
            { requireForBlockBody: true } // 使用了{}，则参数需要使用()
        ],

        // 最佳实践 best-practice
        "array-callback-return": "error", // 数组方法的回调中是否必须使用return
        "block-scoped-var": "error", // 用于检查在块作用域（如函数、条件语句等）中声明的变量
        "consistent-return": "off", // 用于检查函数中是否所有分支都有返回值
        "complexity": ["off", 11], // 用于检查函数的复杂度是否超过指定限制
        "eqeqeq": ["error", "smart"], // 用于检查使用 == 和 != 的地方是否应该使用 === 和 !==
        "no-alert": "warn", // 用于检查代码中是否使用了`alert`、`confirm`或`prompt`函数
        "no-case-declarations": "error", // 用于检查在case语句中是否声明了变量
        "no-multi-str": "error", // 用于检查代码中是否使用了多行字符串
        "no-with": "error", // 用于检查代码中是否使用了`with`语句
        "no-void": "error", // 用于检查代码中是否使用了`void`操作符
        "no-useless-escape": "off", // 用于检查代码中是否使用了不必要的转义字符
        "no-invalid-this": "error", // 不允许在 this 的值为 undefined 的上下文中使用 this
        "vars-on-top": "error", // 用于检查变量声明是否在函数顶部
        "require-await": "off", // 用于检查异步函数中是否必须使用`await`
        "no-return-assign": "off", // 用于检查在return语句中是否使用了赋值操作符
        "max-statements-per-line": ["error", { max: 1 }], // 用于检查每行代码中的语句数是否超过指定限制

        // Node
        "n/no-callback-literal": "off", // 用于检查一个函数被命名为 cb 或 callback 时，他的参数问题

        // unicorns
        "unicorn/error-message": "error", // 用于检查抛出错误时是否传递错误消息
        "unicorn/escape-case": "error", // 用于检查转义字符是否为大写
        "unicorn/no-instanceof-array": "error", // 使用 Array.isArray 而不是 instanceof
        "unicorn/no-new-buffer": "error", // 用于检查是否使用了new Buffer()
        "unicorn/no-unsafe-regex": "off", // 确保正则表达式文字的安全
        "unicorn/number-literal-case": "error", // 八进制、十六进制、二进制的小写数字格式（0x1"error" 而不是 0X1"error"）
        "unicorn/prefer-includes": "error", // 检查是否存在时，首选 .includes() 而不是 .indexOf() 和 Array#some()
        "unicorn/prefer-starts-ends-with": "error", // 字符串截取使用 startsWith/endsWith 而不是 .slice()
        "unicorn/prefer-text-content": "error", // 检查是否存在时，首选 .textContent 而不是 .innerText
        "unicorn/prefer-type-error": "error", // 类型检查判断时出错了，应该使用throw new TypeError() 而不是 Error()
        "unicorn/throw-new-error": "error", // 抛错时需要使用new关键字throw new Error()
        "unicorn/prefer-node-protocol": "error", // 导入node模块时最好使用`node:`协议，import fs from "node:fs/promises"
        "unicorn/prefer-number-properties": "error", // 数字的方法不使用全局方法，使用Number.isNaN(10)而不是isNaN(10)
        "unicorn/no-new-array": "error", // 禁止 new Array，因为 Array 构造函数的参数是不明确的

        "no-use-before-define": ["error", { functions: false, classes: false, variables: true }], // 在定义变量之前禁止使用变量
        "eslint-comments/disable-enable-pair": "off", // 是否要求每个 eslint-disable 注释都有一个 eslint-enable 注释
        "import/no-named-as-default-member": "off", // 用于检查是否使用默认导出名称来导入
        "import/no-named-as-default": "off", // 用于检查是否使用默认导出名称来导入
        "import/namespace": "off", // 用于检查命名空间

        "sort-imports": [
            "error",
            {
                ignoreCase: false, // 是否区分大小写
                ignoreDeclarationSort: true, // 是否导入排序
                ignoreMemberSort: true, // 是否忽略导入多成员的排序
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"], // 排序规则
                allowSeparatedGroups: false, // 是否在导入声明语句之后的空行、注释行或带有任何其他语句的行将重置导入声明语句的排序
            },
        ],

        // yml
        "yml/no-empty-document": "off",
    }
}