<template>
  <section class="switch-value-form">
    <el-form-item label="value类型">
      <el-select v-model="attr.switchValueType" placeholder="请选择value的类型" @change="onChangeSwitchValueType">
        <el-option-group label="boolean">
          <el-option value="false / true"></el-option>
          <el-option value="true / false"></el-option>
        </el-option-group>
        <el-option-group label="number">
          <el-option value="0 / 1"></el-option>
          <el-option value="1 / 0"></el-option>
          <el-option value="number / number"></el-option>
        </el-option-group>
        <el-option-group label="其他：">
          <el-option value="string / string"></el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
    <template v-if="['number / number', 'string / string'].includes(attr.switchValueType)">
      <el-form-item label="inactive-value" label-width="110px">
        <el-input-number v-if="attr.switchValueType === 'number / number'"
          v-model="attr.inactiveValue"
          @change="emitChange"
        ></el-input-number>
        <el-input v-if="attr.switchValueType === 'string / string'"
          v-model.trim="attr.inactiveValue"
          placeholder="inactive-value" clearable
          @change="emitChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="active-value" label-width="110px">
        <el-input-number v-if="attr.switchValueType === 'number / number'"
          v-model="attr.activeValue"
          @change="emitChange"
        ></el-input-number>
        <el-input v-if="attr.switchValueType === 'string / string'"
          v-model.trim="attr.activeValue"
          placeholder="active-value" clearable
          @change="emitChange"
        ></el-input>
      </el-form-item>
    </template>
  </section>
</template>

<script>
export default {
  data () {
    return {
      attr: {
        switchValueType: 'false / true',
        inactiveValue: false,
        activeValue: true
      },
    };
  },
  methods: {
    emitChange () {
      this.$emit('change', this.attr);
    },
    onChangeSwitchValueType (value) {
      const result = value.split(' / ');
      const { attr } = this;
      switch (value) {
        case 'false / true':
          attr.inactiveValue = false;
          attr.activeValue = true;
          break;
        case 'true / false':
          attr.inactiveValue = true;
          attr.activeValue = false;
          break;
        case '0 / 1':
        case '1 / 0':
          attr.inactiveValue = parseInt(result[0], 10);
          attr.activeValue = parseInt(result[1], 10);
          break;
        case 'number / number':
          attr.inactiveValue = parseInt(attr.inactiveValue, 10);
          attr.activeValue = parseInt(attr.activeValue, 10);
          break;
        case 'string / string':
          attr.inactiveValue = String(attr.inactiveValue || '');
          attr.activeValue = String(attr.activeValue || '');
          break;
      }
      this.emitChange();
    }
  }
}
</script>

<style lang="scss">
  .switch-value-form {

  }
</style>
