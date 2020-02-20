<template>
  <div>
    <div slot="header" class="clearfix" style="margin-bottom:15px;">
      <el-input size="mini" v-model.trim='getTableDataAPI' placeholder='请求接口函数名' style='width:200px'></el-input>
      <el-button size="mini" type="primary" style="float:right" @click="prettierJSON(codeString)">生成表格</el-button>
    </div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 5}"
      placeholder="请输入内容, eg:{value:label}，记得给label加上引号"
      v-model="codeString"
      @change="prettierJSON"
    ></el-input>
  </div>
</template>

<script>
import testData from './test.json';
// import { syntaxHighlight } from '@/utils';
export default {
  props: {
    getTableAPI: {
      type: String
    }
  },
  data () {
    return {
      codeObject: '',
      codeString: JSON.stringify(testData, undefined, 2)
    };
  },
  computed: {
    getTableDataAPI: {
      get () {
        return this.getTableAPI
      },
      set (val) {
        this.$emit('update:getTableAPI', val)
      }
    }
  },
  created () {
    this.$emit('change', testData);
  },
  methods: {
    // syntaxHighlight,
    // gen () {},
    prettierJSON (val) {
      // 这句eval对于 对象的字符串 和 json的字符串 都有用。
      // 一定要加String()它才不报错，可能是因为能阉割掉vue绑定的属性。
      const fixedStr = String(val);
      // eslint-disable-next-line no-eval
      this.codeObject = eval(`(${fixedStr})`);
      this.$emit('change', this.codeObject);
    }
  }
};
</script>
