/**
 * @file 定义一些选项的常量
 */
export const input_type_opts = [
  {
    value: 'EInputTrim',
    label: 'EInputTrim 输入框'
  },
  {
    value: 'EInputNumber',
    label: 'EInputNumber 输入框'
  },
  {
    value: 'ERadioGroup',
    label: 'ERadioGroup 单选框组'
  },
  {
    value: 'ECheckboxGroup',
    label: 'ECheckboxGroup 复选框组'
  },
  {
    value: 'ESelect',
    label: 'ESelect 下拉框'
  },
  {
    value: 'ESwitch',
    label: 'ESwitch 开关'
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
    auth: ['ERadioGroup', 'ECheckboxGroup', 'ESelect']
  }, {
    label: '空数组',
    auth: ['ESelect']
  }, {
    label: '字符串数组',
    auth: ['ERadioGroup', 'ECheckboxGroup', 'ESelect']
  }
];
export const isSimpleArray = vForType => ['空数组', '字符串数组'].includes(vForType);