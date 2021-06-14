module.exports = {
    root: true,
    // ESLint で使用するパーサーを指定する
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint"
    ],
    extends: [
      "eslint:recommended",
      // @typescript-eslint/eslint-plugin のおすすめルールを適用する
      "plugin:@typescript-eslint/recommended",
      'prettier'
    ],
    // Node固有の変数にエラーを出さないための設定
    env: { "browser": true, "node": true, "es6": true }
}