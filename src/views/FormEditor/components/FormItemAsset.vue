<template>
  <el-card
    class="box-card"
    style="margin-top:10px"
  >
    <span
      v-for="(form,idx) in forms"
      :key="idx"
    >
      <template v-for="(element,index) in form.specs">
        <el-button
          :key="index"
          round
          size="small"
          style="margin:10px;padding: 10px"
          plain
          @click="addFormItem(element)"
        >
          {{ element.title }}
        </el-button>
      </template>
    </span>
  </el-card>
</template>

<script>
/**
 * @file 左栏
 * 从原来的FormItemDrag 改造而来
 */
import formItemModels from '@/models/form-item.js';

const { EInputTrim, EInputNum, ERadio, ECheckboxGroup, ESelect, ESwitch } = formItemModels;

export default {
  components: {
  },
  data () {
    return {
      forms: [
        {
          type: 'EInput',
          title: 'Input输入框',
          specs: [
            {
              type: 'EInputTrim',
              title: 'Input Trim输入框',
              props: new EInputTrim()
            },
            {
              type: 'EInputNum',
              title: 'Input Number输入框',
              props: new EInputNum()
            }
          ]
        },
        {
          type: 'ERadio',
          title: 'Radio 单选框',
          specs: [
            {
              type: 'ERadio',
              title: 'ERadio 单选框',
              props: new ERadio()
            }
          ]
        },
        {
          type: 'ECheckboxGroup',
          title: 'Checkbox 多选框',
          specs: [
            {
              type: 'ECheckboxGroup',
              title: 'Checkbox 单选框组',
              props: new ECheckboxGroup()
            }
          ]
        },
        {
          type: 'ESelect',
          title: 'Select 选择器',
          specs: [
            {
              type: 'ESelect',
              title: 'Select 单选框组',
              props: new ESelect()
            }
          ]
        },
        {
          type: 'ESwitch',
          title: 'Switch开关',
          specs: [
            {
              type: 'ESwitch',
              title: 'Switch 单选框组',
              props: new ESwitch()
            }
          ]
        }
      ],
      activeName: ['EInput']
    };
  },
  methods: {
    addFormItem (val) {
      this.$store.commit('ADD_FORMITEM_OF_ITEMS', val);
    }
  }
};
</script>
