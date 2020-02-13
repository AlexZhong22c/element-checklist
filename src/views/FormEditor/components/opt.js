/**
 * @file 定义一些选项的常量
 */
export const input_type_opts = [
  {
    value: 'EInputTrim',
    label: '输入框 Trim Input'
  },
  {
    value: 'EInputNum',
    label: '输入框 Num Input'
  },
  {
    value: 'ECheckboxGroup',
    label: '复选框 Checkbox组'
  },
  {
    value: 'ERadio',
    label: '单选框 Radio'
  },
  {
    value: 'ESelect',
    label: '选择器 Select'
  },
  {
    value: 'ESwitch',
    label: '开关 Switch'
  }
]

export const value_type_opts = [
  {
    value: 'url',
    label: '链接'
  },
  {
    value: 'date',
    label: '时间'
  },
  {
    value: 'array',
    label: '数组'
  }
]
export const v_for_type_opts = [
  {
    label: 'labelArray',
    auth: ['ERadio', 'ECheckboxGroup', 'ESelect']
  }, {
    label: '空数组',
    auth: ['ESelect']
  }, {
    label: '字符串数组',
    auth: ['ERadio', 'ECheckboxGroup', 'ESelect']
  }
];
export const isSimpleArray = vForType => ['空数组', '字符串数组'].includes(vForType);