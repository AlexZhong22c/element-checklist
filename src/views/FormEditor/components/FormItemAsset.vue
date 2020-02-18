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

const { EInputTrim, EInputNumber, ERadioGroup, ECheckboxGroup, ESelect, ESwitch } = formItemModels;

export default {
  components: {
  },
  data () {
    return {
      forms: [
        {
          type: 'EInput',
          title: 'EInput 输入框',
          specs: [
            {
              type: 'EInputTrim',
              title: 'EInputTrim 输入框',
              props: new EInputTrim()
            },
            {
              type: 'EInputNumber',
              title: 'EInputNumber 输入框',
              props: new EInputNumber()
            }
          ]
        },
        {
          type: 'ERadioGroup',
          title: 'ERadioGroup 单选框组',
          specs: [
            {
              type: 'ERadioGroup',
              title: 'ERadioGroup 单选框组',
              props: new ERadioGroup()
            }
          ]
        },
        {
          type: 'ECheckboxGroup',
          title: 'ECheckboxGroup 复选框组',
          specs: [
            {
              type: 'ECheckboxGroup',
              title: 'ECheckboxGroup 复选框组',
              props: new ECheckboxGroup()
            }
          ]
        },
        {
          type: 'ESelect',
          title: 'ESelect 下拉框',
          specs: [
            {
              type: 'ESelect',
              title: 'ESelect 下拉框',
              props: new ESelect()
            }
          ]
        },
        {
          type: 'ESwitch',
          title: 'ESwitch 开关',
          specs: [
            {
              type: 'ESwitch',
              title: 'ESwitch 开关',
              props: new ESwitch()
            }
          ]
        }
      ]
    };
  },
  methods: {
    addFormItem (val) {
      this.$store.commit('ADD_FORMITEM_OF_ITEMS', val);
    }
  }
};
</script>
