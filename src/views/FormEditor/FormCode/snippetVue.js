/**
 * @file 以整个 vue 文件 sniffet 作为主入口：
 * 最好不要随意改变字符串模板里面的空格，极其难对齐。
 */
/* eslint-disable no-useless-escape */
import { _genFormItems } from './snippetForm';
import { _genSubmitMethod } from './snippetScript';
import { isSimpleArray } from '@/views/FormEditor/components/opt.js';
import objectStringify from '@/utils/object-stringify';
import deepClone from '@/utils/deep-clone';

const inputRequired = ['EInputTrim', 'EInputNumber'];
const selectRequired = ['ERadioGroup', 'ECheckboxGroup', 'ESelect'];

export const _rules = validated => {
  if (validated) {
    return `:rules="rules"`;
  } else {
    return '';
  }
};

export const _ref = (validated, ref) => {
  if (validated) {
    return `ref="${ref}"`;
  } else {
    return `\u0020`;
  }
};

export const _upsertBtn = (validated, ref, method) => {
  if (validated) {
    return `
<el-form-item>
  <el-button size="mini" type="primary" @click="${method}('${ref}')">创建</el-button>
</el-form-item>`.trim();
  } else {
    return `
<el-form-item>
  <el-button size="mini" type="primary" @click="${method}">创建</el-button>
</el-form-item>`.trim();
  }
};

const _initForm = (formObj, formItems) => {
  if (!formObj) return '';
  return `
function init${_upperFirstLetter(formObj)}() {
  return ${formItems.decorateObject(item => {
    if (item.type === 'ECheckboxGroup') return `${item.props.value}: []`;
    return `${item.props.value}: ''`;
  }).insertBlanks(2)}
}
  `.trim();
}

// 只要有机会构造options，就传给items:
const _genOptions = items => {
  return items.decorateObject(item => {
    const { props } = item;
    // 为了结果的对齐，没有填value的直接忽视了：
    if (!props.value) return '';
    if (item.props.vForType === '空数组') return `${props.value}: []`;
    if (item.props.vForType === '字符串数组') {
      return `
${`${props.value}: ${objectStringify(props.textGroupData)}`}
      `.trim().insertBlanks(2);
    }
    return '';
  });
};

const _upperFirstLetter = string => {
  if (!string || typeof string !== 'string') return '';
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

const _importLabelArray = names => `import ${window.decorateObject(names)} from './index.label-array.js';`;

export const _genRules = formItems => {
  return formItems.decorateObject(item => {
    const { props } = item;
    const trigger = item.type === 'ESelect' ? 'change' : 'blur';
    const hasNumberMin = props.validatorMin || props.validatorMin === 0;
    return `
${props.value}: ${window.decorateArray([
  `{ required: true, message: '请输入${props.label}', trigger: 'blur' }`.isExist(props.validatorRequired && inputRequired.includes(item.type)),
  `{ required: true, message: '请选择${props.label}' }`.isExist(props.validatorRequired && selectRequired.includes(item.type)),
  `{ type: '${props.validatorType}', message: '${props.label}格式应为${props.validatorType}', trigger: '${trigger}' }`.isExist(props.validatorType),
  `{ type: 'integer', message: '${props.label}必须为整数' }`.isExist(props.validatorInt),
  `{ pattern: /^(([0-9]*[1-9][0-9]*)|(0+))$/, message: '${props.label}必须为自然数' }`.isExist(props.validatorNaturalNum),
  `{ min: ${props.validatorMin}, message: '${props.label}不得小于${props.validatorMin}', type: 'number' }`.isExist(item.type === 'EInputNumber' && (hasNumberMin && !props.validatorMax)),
  `{ max: ${props.validatorMax}, message: '${props.label}不得大于${props.validatorMax}', type: 'number' }`.isExist(item.type === 'EInputNumber' && (!hasNumberMin && props.validatorMax)),
  `{ min: ${props.validatorMin}, max: ${props.validatorMax}, message: '${props.label}的范围应为${props.validatorMin}~${props.validatorMax}', type: 'number' }`.isExist(item.type === 'EInputNumber' && (hasNumberMin && props.validatorMax)),
  `{ min: ${props.validatorMin}, message: '${props.label}的长度不得小于${props.validatorMin}个字符' }`.isExist(item.type === 'EInputTrim' && props.validatorMin),
  `{ max: ${props.validatorMax}, message: '${props.label}的长度不得大于${props.validatorMax}个字符' }`.isExist(item.type === 'EInputTrim' && props.validatorMax)
])}`.trim().insertBlanks(2)
  })
};

export const genVueFileWrapper = ({ formObj, validated, ref, method, confirmed, formItems } = {}) => {
  const labelArrayItems = [];
  const genOptionsItems = [];

  formItems.forEach(fItem => {
    const { vForName, vForType } = fItem.props;

    if (vForName && vForType === 'labelArray') {
      const labelArrayResult = deepClone(fItem);
      const { labelArrayData = [] } = labelArrayResult.props;
      labelArrayData.forEach(laItem => {
        // 为了输出字符串做准备：
        if (!laItem.alias) {
          delete laItem.alias;
        }
        delete laItem.valueType;
      });
      labelArrayItems.push(labelArrayResult);
    }

    if (isSimpleArray(vForType)) genOptionsItems.push(fItem);
  });

  const labelArrayNames = labelArrayItems.map(item => item.props.vForName);
  return `
<template>
<el-form :model="${formObj}" ${_ref(validated, ref)} ${_rules(validated)} label-width="90px">\n
  ${_genFormItems(formObj, validated, formItems).insertBlanks(2)}

  ${_upsertBtn(validated, ref, method).insertBlanks(2)}
</el-form>
</template>
<script>
  ${_importLabelArray(labelArrayNames).isExist(labelArrayNames.length).insertBlanks(2)}${'\n'.isExist(labelArrayNames.length)}
  ${_initForm(formObj, formItems).insertBlanks(2)}
  export default {
    data() {
      return {
        ${labelArrayNames.join(',\n').insertBlanks(8) + ','.isExist(labelArrayNames.length)}
        ${formObj}: init${_upperFirstLetter(formObj)}(),
        rules: ${_genRules(formItems).isExist(validated).insertBlanks(8)},
        options: ${_genOptions(genOptionsItems).insertBlanks(8)}
      }
    },
    methods: {
      ${_genSubmitMethod(validated, confirmed, formObj, method).insertBlanks(6)},
      scrollToInvalid() {
        setTimeout(() => {
          const isError = document.getElementsByClassName('is-error')[0];
          try {
            isError.querySelector('input').focus();
          } catch (e) {
            isError.scrollIntoView();
          }
        }, 100);
      }
    }
  }
<\/script>

<script>
/* ./index.label-array.js */
import { labelArray } from '@iyourcar/label-array';
${labelArrayItems.map(item => `export const ${item.props.vForName} = labelArray(${objectStringify(item.props.labelArrayData, null, 2)});`).join('\n')}
</script>
`;
};
