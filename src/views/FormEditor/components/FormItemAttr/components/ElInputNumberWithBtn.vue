<template>
  <section class="el-input-number-with-btn">
    <el-input-number :value="value"
      @change="onChange" :placeholder="placeholder"
    ></el-input-number>
    <template v-for="item in btnList">
      <el-button type="text" @click="onClickBtn(item)" :key="item" class="ml10">{{item}}</el-button>
    </template>
  </section>
</template>

<script>
/**
 * @file
 * 对外接口和el-input-number的一样：
 * 属性：v-model btn-list placeholder
 * 方法：change
 */
export default {
  props: {
    placeholder: {
      type: String
    },
    value: {},
    btnList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange (value) {
      this.$emit('input', value);
      this.$emit('change');
    },
    onClickBtn (value) {
      if ((!value && value !== 0) || value === '清空') {
        this.$emit('input', undefined);
      } else {
        this.$emit('input', value);
      }
      this.$emit('change');
    }
  },
};
</script>

<style>
  .el-input-number-with-btn .ml10 {
    margin-left: 10px;
  }
</style>
