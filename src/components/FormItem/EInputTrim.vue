
<template>
  <el-input v-model.trim="inputVal" v-model="inputVal" v-bind="$attrs" placeholder="字符串去空格"></el-input>
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
