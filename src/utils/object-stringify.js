/**
 * @file objectStringify 是基于 JSON.stringify 修改的。
 * 参考源码： https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js
 * 参考文章： https://github.com/YvetteLau/Step-By-Step/issues/39
 */
/* eslint-disable */
const rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta = {    // table of character substitutions
  "\b": "\\b",
  "\t": "\\t",
  "\n": "\\n",
  "\f": "\\f",
  "\r": "\\r",
  "\"": "\\\"",
  "\\": "\\\\"
};

let gap;
let indent;
let rep;
let maxLength;

function getV(partial, gap, mind) {
  if (partial.length === 0) {
      return '{}';
  }
  const objContent = partial.join(',\n' + gap);
  const isNextLine = objContent.length > maxLength;
  const objContentResult = isNextLine ? objContent : partial.join(', ')
  if (gap) {
      return `{${isNextLine ? `\n${gap}`: ' '}${objContentResult}${isNextLine ? `\n${mind}`: ' '}}`;
  }

  return `{ ${partial.join(',')} }`;
}

function quote(string) {
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.
    rx_escapable.lastIndex = 0;
    if (rx_escapable.test(string)) {
        return "\"" + string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + "\"";
    }
    if (string.includes('-')) {
        return `'${string}'`;
    }
    return string;
}
function str(key, holder) {
// Produce a string from holder[key].
    var i;          // The loop counter.
    var k;          // The member key.
    var v;          // The member value.
    var length;
    var mind = gap;
    var partial;
    var value = holder[key];
// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
// What happens next depends on the value's type.
    if (value === null) { return String(value); }
    switch (typeof value) {
    case 'string':
        return `'${value}'`;

    case 'number':
    case "boolean":
        return String(value);

// If the type is "object", we might be dealing with an object or an array or null.
    case "object":
// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.
        if (!value) { return 'null'; }

// Make an array to hold the partial results of stringifying this object value.
        gap += indent;
        partial = [];

// Is the value an array?
        if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.
            length = value.length;
            for (i = 0; i < length; i += 1) {
                partial[i] = str(i, value) || 'null';
            }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.
            const arrayContent = partial.join(',\n' + gap);
            const isNextLine = arrayContent.length > maxLength;
            const arrayContentResult = isNextLine ? arrayContent : partial.join(', ');
            if (partial.length === 0) {
                v = '[]'
            } else if (gap) {
                v = `[${isNextLine ? `\n${gap}`: ''}${arrayContentResult}${isNextLine ? `\n${mind}`: ''}]`;
            } else {
                // 数组和对象的区别就是最两边不用加空格：
                v = `[${partial.join(',')}]`;
            }
            gap = mind;
            return v;
        }

// If the replacer is an array, use it to select the members to be stringified.
// Otherwise, iterate through all of the keys in the object.
        if (rep && typeof rep === 'object') {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
                if (typeof rep[i] === 'string') {
                    k = rep[i];
                    v = str(k, value);
                    if (v) {
                        partial.push(`${quote(k)}:${gap ? ' ' : ''}${v}`);
                    }
                }
            }
        } else {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = str(k, value);
                    if (v) {
                        partial.push(`${quote(k)}:${gap ? ' ' : ''}${v}`);
                    }
                }
            }
        }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.
        v = getV(partial, gap, mind);
        gap = mind;
        return v;
    }
}

// maxLength decide to which it should break line in an object:
const objectStringify = function (value, replacer, space, maxl = 80) {
  var i;
  gap = '';
  indent = '';
  maxLength = maxl

  if (typeof space === 'number') {
      indent += ' '.repeat(space);

// If the space parameter is a string, it will be used as the indent string.

  } else if (typeof space === 'string') {
      indent = space;
  }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

  rep = replacer;
  if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
      throw new Error("JSON.stringify");
  }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.
  return str("", {"": value});
};

export default objectStringify;
 //      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.


//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.