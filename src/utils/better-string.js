/* eslint-disable no-extend-native */
/* eslint-disable no-restricted-syntax */

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function decorateObjectOrArrayCore (callback, thisOfCallback) {
  let idx;

  if (this === null) {
    throw new TypeError('this is null or not defined');
  }
  if (Object.prototype.toString.call(callback) !== '[object Function]') {
    throw new TypeError(callback + ' is not a function');
  }

  var originArray = Object(this);
  // 2.将len赋值为数组originArray的长度.
  var len = originArray.length || 0;

  const result = [];

  // 6. 将idx赋值为0
  idx = 0;

  // 7. 当 idx < len 时,执行循环.
  while (idx < len) {
    var item, mappedValue;

    // 遍历originArray,idx为原数组索引
    if (idx in originArray) {
      item = originArray[idx];
      if (item) {
        // 执行callback,this指向self,参数有三个.分别是item:值,idx:索引,originArray:原数组.
        mappedValue = callback.call(thisOfCallback, item, idx, originArray);
        mappedValue && result.push(mappedValue);
      }
    }
    idx++;
  }
  return result;
}

// 全局的缩进：
String.gIndent = '  ';

String.blanks = function (n) {
  return ' '.repeat(n);
}

// 只要是空行就移除：
String.prototype.removeBlankLines = function () {
  return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '');
}
// 在行与行间加入逗号，加在上一行的末尾：
String.prototype.insertComma = function () {
  return this.replace(/\n/g, ',\n');
}

// 应用于字符串模板，给第二行至最后一行的行前添加 n 个空格的缩进：(在行与行间加入 n 个空格，加在下一行的前面)
String.prototype.insertBlanks = function (n) {
  if (this === '') return '';
  if (this.split('\n').length === 1) return this;
  return this.replace(/\n/g, `\n${String.blanks(n)}`);
}

/**
 * 用来辅助实现模板的逻辑，isExist通常是非必须的
 * @params flag 【必填】
 */
String.prototype.isExist = function (flag) {
  return flag ? this : '';
}

Array.prototype.decorateObject = function (callback, thisOfCallback, indent) {
  const blanks = ' '.repeat(indent || 2);
  const result = decorateObjectOrArrayCore.bind(this)(callback, thisOfCallback);
  if (!result.length) return '{}';
  return '{\n' + blanks + result.join(`,\n${blanks}`) + '\n}';
}
Array.prototype.decorateArray = function (callback, thisOfCallback, indent) {
  const blanks = ' '.repeat(indent || 2);
  const result = decorateObjectOrArrayCore.bind(this)(callback, thisOfCallback);
  if (!result.length) return '[]';
  return '[\n' + blanks + result.join(`,\n${blanks}`) + '\n]';
}

window.decorateObject = function (arr, indent) {
  const blanks = ' '.repeat(indent || 2);
  const result = arr.filter(item => item);
  if (!result.length) return '[]';
  return '{\n' + blanks + result.join(`,\n${blanks}`) + '\n}';
}

window.decorateArray = function (arr, indent) {
  const blanks = ' '.repeat(indent || 2);
  const result = arr.filter(item => item);
  if (!result.length) return '[]';
  return '[\n' + blanks + result.join(`,\n${blanks}`) + '\n]';
}

// 草稿区域：
// Object.defineProperty(Object.prototype, 'decorateArray', {
//   configurable: false,
//   enumerable: false,
//   value: ,
//   writable: false
// })
// const abc = [{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 1 }, { a: 2, b: 3, c: 1 }];
// console.log(
//   abc.decorateObject(({ a, b, c }) =>  {
//     return `axxx${a}, ,,,,bxxx${b},,,,cxxxx${c}, ${JSON.stringify(this)}`
//   }
//   , null, 4)
// )
