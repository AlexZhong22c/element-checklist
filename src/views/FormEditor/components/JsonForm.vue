<template>
  <el-card class="box-card" style="margin-top:10px;">
    <div slot="header" class="clearfix">
      <span>{{$t('form.JSON')}}</span>
      <el-button size="mini" type="primary" style="float:right" @click="gen">生成表单</el-button>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5}"
      placeholder="请输入内容, eg:{value:label}，记得给label加上引号"
      v-model="formJson"
    ></el-input>
  </el-card>
</template>

<script>
/**
 * @file 左下角的json表单
 */
import { isObject, isArray } from '@/utils';
import formItemModels from '@/models/form-item.js';
import testData from '../test.json';

const { EInputTrim } = formItemModels;
export default {
  data () {
    return {
      formJson: JSON.stringify(testData, undefined, 2)
    };
  },
  methods: {
    flattening (data, pre_value) {
      if (!isObject(data)) {
        this.$message.error('对象格式不正确');
      }
      if (isArray(data)) {
        this.$message.error('不支持数组嵌套数组');
      }
      let tmp = [];
      Object.keys(data).map(item => {
        if (isObject(data[item])) {
          if (isArray(data[item])) {
            data[item].map((arr_item, idx) => {
              const pre = pre_value ? `${pre_value}${item}[${idx}].` : `${item}[${idx}].`;
              const res = this.flattening(arr_item, pre);
              tmp = tmp.concat(res);
            });
          } else {
            const pre = pre_value ? `${pre_value}${item}_` : `${item}_`;
            const res = this.flattening(data[item], pre);
            tmp = tmp.concat(res);
          }
        } else {
          const value = pre_value ? `${pre_value}${item}` : item;
          tmp.push({
            type: 'EInputTrim',
            title: 'EInputTrim 输入框',
            props: {
              ...new EInputTrim(),
              label: `${data[item] || item}`,
              value
            }
          });
        }
      });
      return tmp;
    },

    gen () {
      try {
        // 这句eval对于 对象的字符串 和 json的字符串 都有用。
        // 一定要加String()它才不报错，可能是因为能阉割掉vue绑定的属性。
        const fixedStr = String(this.formJson);
        // eslint-disable-next-line no-eval
        const formData = eval(`(${fixedStr})`);
        const formItems = this.flattening(formData);
        this.$store.commit('SET_FORMITEMS', formItems);
      } catch (error) {
        this.$message.error('请填入正确的Object');
      }
    }
  }
};
</script>
