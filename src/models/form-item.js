/**
 * @file 这里集齐所有模型。
 * 每个作为模型的class都应该复写一个 keys 静态属性，这样才有作为模型的意义。
 * vue无法响应数据变化，通常就是因为初始化对象的时候原本没有这个字段。
 */
const labelArrayDataCommon = () => [
  { label: '类别1', value: 1, alias: '', valueType: 'number' },
  { label: '类别2', value: 2, alias: '', valueType: 'number' },
  { label: '类别3', value: 3, alias: '', valueType: 'number' }
];
class Base {
  // label 和 value 没必要初始化为 undefined:
  // el-form-item属性:
  label = ''
  value = ''
  requiredSymbol = false
  formItemTips = undefined

  // 数据验证：
  validatorRequired = undefined
  // type = ''

  static keys = Object.keys(new Base());
  static resetTemplate = Object.freeze(new Base());
}

class EInputTrim extends Base {
  // 该元素属性：
  trim = undefined
  clearable = true
  maxlength = 20
  // 数据验证：
  validatorMin = undefined
  validatorMax = undefined

  static keys = Object.keys(new EInputTrim());
  static resetTemplate = Object.freeze(new EInputTrim());
}

class EInputNumber extends Base {
  // 数据验证：
  validatorInt = undefined
  validatorNaturalNum = undefined
  validatorMin = undefined
  validatorMax = undefined
  // 不常用属性：
  controls = true
  step = 1
  precision = undefined
  placeholder = undefined
}
class ERadioGroup extends Base {
  // 该元素属性：
  radioButton = false
  vForName = undefined
  vForType = 'labelArray'
  textGroupData = ['类别1', '类别2', '类别3']
  labelArrayData = labelArrayDataCommon()
  // 不常用属性：
  radioBorder = undefined
}

class ECheckboxGroup extends Base {
  // 该元素属性：
  checkboxButton = false
  vForName = undefined
  vForType = 'labelArray'
  textGroupData = ['类别1', '类别2', '类别3']
  labelArrayData = labelArrayDataCommon()
  checkboxMin = undefined
  checkboxMax = undefined
}

class ESelect extends Base {
  // 该元素属性：
  clearable = true
  filterable = true
  vForName = undefined
  vForType = '空数组'
  textGroupData = ['类别1', '类别2', '类别3']
  labelArrayData = labelArrayDataCommon()
}

class ESwitch extends Base {
  // 数据验证：
  // 重写继承过来的该属性，必然为false:
  validatorRequired = false
  // 该元素属性：
  inactiveText = undefined
  activeText= undefined

  switchValueType = 'false / true'
  inactiveValue = false
  activeValue = true
  // 不常用属性：
  width = undefined
  inactiveIconClass = undefined
  activeIconClass = undefined
}

export default {
  Base,
  EInputTrim,
  EInputNumber,
  ERadioGroup,
  ECheckboxGroup,
  ESelect,
  ESwitch
};
