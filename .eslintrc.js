module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // https://eslint.vuejs.org/rules/
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard'
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'modules',
    'import'
  ],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
    // 这个看情况吧：
    "vue/no-use-v-if-with-v-for": "off",
    // 可以使用++
    // 'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'no-plusplus': 'off',
    'prefer-promise-reject-errors': 'off',
    'max-len': ['error', { 'code': 300 }],
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'only-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'ignore'
    }],
    'arrow-parens': ['error', 'as-needed'],
    'prefer-destructuring': ['error', {
      VariableDeclarator: {
        object: false,
        array: false
      },
      AssignmentExpression: {
        object: false,
        array: false
      }
    }],
    // 'import/resolver': ['error', { ignore: ['@/'] }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/order': ['error'],
    'semi': 'off',
    'lines-between-class-members': 'off',
    'no-param-reassign': ['error', { 'props': false }],
    // 'array-callback-return': ["error"],
    'consistent-return': 'off',
    'camelcase': 'off',
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    // 'consistent-return': ["error"],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 去掉一些不必用于非生产环境项目中的，没必要统一的，合并代码的时候一堆warning：
    'import/order': 'off',
    'quotes': 'off',
    'eol-last': 'off',
    'arrow-parens': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
};
