
<template>
  <el-input-number v-model="inputVal" placeholder="数字" v-bind="$attrs"></el-input-number>
</template>

<script>
export default {
  porps: {
    value: ''
  },
  data () {
    return {};
  },
  computed: {
    inputVal: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('change', val);
        this.$emit('input', val);
      }
    }
  }
};
</script>
