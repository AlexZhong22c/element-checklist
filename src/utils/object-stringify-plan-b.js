/**
 * @file 已经根据这个原理，把优化后的代码加到“better-string”上。
 * /
/**
 * 帮助加逗号和换行
 * @param {Array} strArr 字符串版对象 内的逗号分隔的每一项(每一项可以是多行的)
 */
export function stringifyObject (strArr) {
  if (Object.prototype.toString.call(strArr) !== '[object Array]') {
    throw TypeError('first parameter must be an Array');
  }
  return '{\n' + String.gIndent + strArr.filter(item => item).join(`,\n${String.gIndent}`) + '\n}';
}

/**
 * 帮助加逗号和换行
 * @param {Array} strArr 字符串版数组 内的逗号分隔的每一项(每一项可以是多行的)
 */
export function stringifyArray (strArr) {
  if (Object.prototype.toString.call(strArr) !== '[object Array]') {
    throw TypeError('first parameter must be an Array');
  }
  return '[\n' + String.gIndent + strArr.filter(item => item).join(`,\n${String.gIndent}`) + '\n]';
}
