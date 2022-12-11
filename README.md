# @fanv/eslint-config

## 使用

### 安装

```bash
pnpm add -D eslint @fanv/eslint-config
```

### 配置 `.eslintrc` 文件

```json
{
  "extends": "@fanv"
}
```

### 在 `package.json` 中添加 script 

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### VsCode 配置自动格式化

- 在 vsCode 中安装一个 eslint 插件
- 创建 `.vscode/setting.json`，并添加以下配置

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### WebStorm 配置自动格式化

按照以下步骤设置
settings -> Actions on Save -> 勾选 Run eslint --fix -> 点击确认即可

