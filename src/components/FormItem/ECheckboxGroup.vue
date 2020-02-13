
<template>
  <el-checkbox-group v-model="myData">
    <el-checkbox :label="123" :key="123">备选项</el-checkbox>
    <el-checkbox :label="456" :key="456">备选项</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  porps: {
  },
  data () {
    return {
      myData: ['123']
    };
  },
  computed: {
    // inputVal: {
    //   get () {
    //     return this.value;
    //   },
    //   set (val) {
    //     this.$emit('change', val);
    //     this.$emit('input', val);
    //   }
    // }
  }
};
</script>
