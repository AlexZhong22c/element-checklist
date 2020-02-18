/*
 * 为了可读性：return的字符串模板，都是从return处另起一行，字符串模板内容的最外层的缩进都是从最左边无缩进开始的，最后给这个字符串模板加.trim。
@example -- start
export const formItemTips = ({ formItemTips }) => {
  return `
<br><span class="form-item-tips">${formItemTips}</span>
<span class="form-item-error" slot="error" slot-scope="error">&nbsp;{{error.error}}</span>
  `.trim();
};
@example -- end
*/
import changeCase from 'change-case';
import { isSimpleArray } from '@/views/FormEditor/components/opt.js';

const attrWhenVForSimpleArray = value => ({
  'v-for': `(item, index) in options.${value}`,
  ':label': 'item',
  ':key': 'item + index'
});
const attrWhenVForLabelArray = vForName => ({
  'v-for': `item in ${vForName}`,
  ':label': 'item.value',
  ':key': 'item.value'
});
const attrWhenVForSimpleArrayOfSelect = value => ({
  'v-for': `(item, index) in options.${value}`,
  ':value': 'item',
  ':key': 'item + index'
});
const attrWhenVForLabelArrayOfSelect = vForName => ({
  'v-for': `item in ${vForName}`,
  ':value': 'item.value',
  ':label': 'item.label',
  ':key': 'item.value'
});
/**
 * 对 changeCase.kebabCase 封装一层。
 * 因为如果字符串开头是冒号的话， changeCase.kebabCase 会把这个冒号从返回结果中刨除，所以这里封装一个不会扔掉冒号的：
 * @param {String} str
 */
const toKebabCase = str => {
  if (str.charAt(0) === ':') {
    return `:${changeCase.kebabCase(str.substring(1))}`;
  }
  return changeCase.kebabCase(str);
}
/**
 * @param {Object} attrsObj
 * 帮助处理拼接 vue html 的属性，顺便处理空格的问题。
 * 主动传入冒号开头的key，返回的就是冒号开头的key。
 */
const _attr = attrsObj => {
  let result = '';
  for (const key in attrsObj) {
    let curAttr;
    const value = attrsObj[key];
    const newKey = toKebabCase(key);

    if (value === undefined || value === '') {
      curAttr = '';
    } else if (value === true) {
      curAttr = ` ${newKey}`;
    } else if (typeof value !== 'string') {
      // 传入的时候，如果value不是string，key就不要去传多冒号了，newKey就没有冒号了！！！！！！！！
      curAttr = ` :${newKey}="${value}"`;
    } else {
      curAttr = ` ${newKey}="${value}"`;
    }
    result = result + curAttr;
  }
  return result;
};

const _prop = (validated, value) => {
  if (validated) {
    return `prop="${value}"`;
  } else {
    return `\u0020`;
  }
};

const _required = (requiredSymbol, validatorRequired) => {
  if (!requiredSymbol) {
    return '';
  }
  // 如果 validatorRequired，这个模板的required就会被转移到js校验那里。
  if (requiredSymbol && validatorRequired) {
    return '';
  }
  return ' required';
}
export const _genFormItems = (formObj, validated, formItems) => {
  return formItems.map(item => {
    return `
${EFormItemStartTag(validated, item.props)}
  ${formItemsContent[item.type](formObj, item.props).insertBlanks(2)}
  ${formItemTips(item.props).isExist(item.props.formItemTips).insertBlanks(2)}
</el-form-item>
    `.trim().removeBlankLines();
  }).join('\n');
};

export const EFormItemStartTag = (validated, { value, label, requiredSymbol, validatorRequired }) => {
  return `
<el-form-item label="${label}" ${_prop(validated, value)}${_required(requiredSymbol, validatorRequired)}>
  `.trim();
};

export const formItemTips = ({ formItemTips }) => {
  return `
<br><span class="form-item-tips">${formItemTips}</span>
<span class="form-item-error" slot="error" slot-scope="error">&nbsp;{{error.error}}</span>
  `.trim();
};

export const EInputTrim = (formObj, { value, label, trim: trimParam, clearable, maxlength, enableMaxlength }) => {
  const attr = {
    placeholder: `请输入${label}`,
    clearable,
    maxlength: enableMaxlength ? maxlength : undefined
  };
  return `
<el-input v-model${trimParam ? '.trim' : ''}="${formObj}.${value}"${_attr(attr)}></el-input>
  `.trim();
}

export const EInputNumber = (formObj, { value, controls, step, precision, placeholder }) => {
  const attr = {
    controls: controls === false ? false : undefined,
    step: step > 1 ? step : undefined,
    precision: !precision ? undefined : precision,
    placeholder
  };
  return `
<el-input-number v-model="${formObj}.${value}"${_attr(attr)}></el-input-number>
  `.trim();
}

export const ESelect = (formObj, { value, label, clearable, filterable, vForType, vForName }) => {
  const attr = {
    placeholder: `请选择${label}`,
    clearable,
    filterable
  };
  let elOptionAttr;
  if (isSimpleArray(vForType)) {
    elOptionAttr = attrWhenVForSimpleArrayOfSelect(value);
  } else {
    elOptionAttr = attrWhenVForLabelArrayOfSelect(vForName);
  }
  return `
<el-select v-model="${formObj}.${value}"${_attr(attr)}>
  <el-option${_attr(elOptionAttr)}></el-option>
</el-select>
  `.trim();
};

export const ECheckboxGroup = (formObj, { value, vForName, vForType, checkboxButton: checkboxButtonParam, checkboxMin, checkboxMax }) => {
  const attr = {
    min: checkboxMin || undefined,
    max: checkboxMax || undefined
  };
  if (isSimpleArray(vForType)) {
    Object.assign(attr, attrWhenVForSimpleArray(value));
    return `
<el-checkbox-group v-model="${formObj}.${value}">
  <el-checkbox${checkboxButtonParam ? '-button' : ''}${_attr(attr)}
  ></el-checkbox${checkboxButtonParam ? '-button' : ''}>
</el-checkbox-group>
    `.trim();
  }
  Object.assign(attr, attrWhenVForLabelArray(vForName));
  return `
<el-checkbox-group v-model="${formObj}.${value}">
  <el-checkbox${checkboxButtonParam ? '-button' : ''}${_attr(attr)}
  >{{item.label}}</el-checkbox${checkboxButtonParam ? '-button' : ''}>
</el-checkbox-group>
  `.trim();
}

export const ERadioGroup = (formObj, { value, vForName, radioButton: radioButtonParam, radioBorder, vForType }) => {
  const attr = { border: radioBorder };
  if (isSimpleArray(vForType)) {
    Object.assign(attr, attrWhenVForSimpleArray(value));
    return `
<el-radio-group v-model="${formObj}.${value}">
  <el-radio${radioButtonParam ? '-button' : ''}${_attr(attr)}
  ></el-radio${radioButtonParam ? '-button' : ''}>
</el-radio-group>
    `.trim();
  }
  Object.assign(attr, attrWhenVForLabelArray(vForName));
  return `
<el-radio-group v-model="${formObj}.${value}">
  <el-radio${radioButtonParam ? '-button' : ''}${_attr(attr)}
  >{{item.label}}</el-radio${radioButtonParam ? '-button' : ''}>
</el-radio-group>`.trim();
}
export const ESwitch = (formObj, {
  value, width,
  inactiveIconClass, activeIconClass, inactiveText, activeText,
  inactiveValue, activeValue
}) => {
  const attr = {
    width,
    inactiveText,
    activeText,
    inactiveIconClass,
    activeIconClass,
    inactiveValue: inactiveValue === false ? undefined : inactiveValue,
    activeValue: activeValue === true ? undefined : activeValue
  };
  return `
<el-switch v-model="${formObj}.${value}"${_attr(attr)}></el-switch>
  `.trim();
}
// 分发：
const formItemsContent = {
  EInputTrim,
  EInputNumber,
  ESelect,
  ECheckboxGroup,
  ERadioGroup,
  ESwitch
};
