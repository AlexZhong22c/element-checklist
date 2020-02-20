<template>
  <el-form
    :model="form"
    label-width="80px"
  >
    <el-form-item label="表单对象">
      <el-input
        v-model.trim="form.formObj"
        placeholder="表单对象"
      />
    </el-form-item>
    <el-form-item label="提交方法">
      <el-input
        v-model.trim="form.method"
        placeholder="提交方法"
      />
    </el-form-item>
    <el-form-item label="表单Ref">
      <el-input
        v-model.trim="form.ref"
        placeholder="表单的Ref值"
      />
    </el-form-item>
    <el-form-item label="是否验证">
      <el-checkbox v-model="form.validated" />
    </el-form-item>
    <el-form-item label="双重确认">
      <el-checkbox v-model="form.confirmed" />
      这个其实就加了个$confirm而已，之后再搞也可以
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * @file 右栏的设置整个表单的属性
 */
export default {
  data () {
    return {
      form: {
        formObj: 'myForm',
        ref: 'myFormRef',
        validated: true,
        confirmed: false,
        method: 'onSubmitForm'
      }
    };
  },
  watch: {
    form: {
      handler: function (val) {
        this.$store.commit('SET_FORM_ATTRIBUTE', {
          ...val,
          ref: val.validated && val.ref
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.formItemMargin {
  margin-right: 10px;
}
</style>
