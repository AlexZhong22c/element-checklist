<template>
  <el-card class="formitem-drop-attr__box-card">
    <el-form :model="formItemAttribute" label-width="90px">
      <el-form-item label="表单元素">
        <el-select
          :value="formItemElement.type"
          placeholder="请选择表单元素类型"
          @change="onChangeFormItemElement"
        >
          <el-option
            v-for="item in input_type_opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <legend>el-form-item属性：</legend>
      <el-form-item label="label">
        <el-input
          v-model.trim="formItemAttribute.label"
          placeholder="请输入label" clearable
          @change="setFormItemAttribute"
        ></el-input>
      </el-form-item>
      <el-form-item label="value">
        <el-input
          v-model.trim="formItemAttribute.value"
          placeholder="请输入value" clearable
          @change="setFormItemAttributeAndInitOthers('value2vForName')"
        ></el-input>
      </el-form-item>
      <el-form-item label="必填*号">
        <el-checkbox
          v-model="formItemAttribute.requiredSymbol"
          :key="`formItemAttribute.requiredSymbol${formItemAttribute.requiredSymbol}`"
          @change="setFormItemAttribute"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="文字提示">
        <el-input
          v-model.trim="formItemAttribute.formItemTips"
          placeholder="请输入文字提示" clearable
          @change="setFormItemAttribute"
        ></el-input>
      </el-form-item>
      <legend>该元素属性：</legend>
      <el-form-item label-width="0px">
        <el-checkbox
          v-if="['EInputTrim'].includes(formItemElement.type)"
          :value="formItemAttribute.trim"
          :key="`formItemAttribute.trim${formItemAttribute.trim}`"
          @change="(value) => toggleFormItemAttribute(value, 'trim')"
        >.trim</el-checkbox>
        <el-checkbox
          v-if="['EInputTrim', 'ESelect'].includes(formItemElement.type)"
          :value="formItemAttribute.clearable"
          :key="`formItemAttribute.clearable${formItemAttribute.clearable}`"
          @change="(value) => toggleFormItemAttribute(value, 'clearable')"
        >clearable</el-checkbox>
        <el-checkbox
          v-if="['EInputTrim'].includes(formItemElement.type)"
          v-model="formItemAttribute.enableMaxlength"
          :key="`formItemAttribute.enableMaxlength${formItemAttribute.enableMaxlength}`"
          @change="setFormItemAttribute"
        >maxlength</el-checkbox>
        <el-checkbox
          v-if="['ERadioGroup'].includes(formItemElement.type)"
          v-model="formItemAttribute.radioButton"
          :key="`formItemAttribute.radioButton${formItemAttribute.radioButton}`"
          @change="setFormItemAttribute"
        >radio-button</el-checkbox>
        <el-checkbox
          v-if="['ECheckboxGroup'].includes(formItemElement.type)"
          v-model="formItemAttribute.checkboxButton"
          :key="`formItemAttribute.checkboxButton${formItemAttribute.checkboxButton}`"
          @change="setFormItemAttribute"
        >checkbox-button</el-checkbox>
        <el-checkbox
          v-if="['ESelect'].includes(formItemElement.type)"
          :value="formItemAttribute.filterable"
          :key="`formItemAttribute.filterable${formItemAttribute.filterable}`"
          @change="(value) => toggleFormItemAttribute(value, 'filterable')"
        >filterable</el-checkbox>
      </el-form-item>
      <el-form-item label="maxlength" key="maxlength"
        v-if="['EInputTrim'].includes(formItemElement.type) && formItemAttribute.enableMaxlength">
        <el-input-number-with-btn
          v-model="formItemAttribute.maxlength"
          :btn-list="[20, 100]"
          placeholder="maxlength"
          @change="setFormItemAttribute">
        </el-input-number-with-btn>
      </el-form-item>
      <template v-if="hasVForComputed">
        <legend>v-for:</legend>
        <el-form-item label="数组类型">
          <el-select v-model="formItemAttribute.vForType" placeholder="请选择数组类型" @change="onChangeVForType">
            <el-option v-for="item in vForTypeComputed" :key="item.label" :value="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="0px" v-if="formItemAttribute.vForType === 'labelArray'">
          <el-input
            v-model.trim="formItemAttribute.vForName"
            placeholder="请输入v-for数组名" clearable
            @change="setFormItemAttribute"
          ></el-input>
          <el-button type="primary" class="mt8" @click="onEditLabelArray(formItemAttribute.labelArrayData)">编辑labelArray</el-button>
          <el-table :data="formItemAttribute.labelArrayData">
            <el-table-column label="label" prop="label"></el-table-column>
            <el-table-column label="value" prop="value"></el-table-column>
            <el-table-column label="alias" prop="alias"></el-table-column>
          </el-table>
        </el-form-item>
        <legend v-if="formItemAttribute.vForType === '字符串数组'">v-for字符串数组：</legend>
        <el-form-item label="" label-width="0px" v-if="formItemAttribute.vForType === '字符串数组'">
          <TextGroup v-model="formItemAttribute.textGroupData" @input="setFormItemAttribute"></TextGroup>
        </el-form-item>
      </template>
      <el-form-item label="min" label-width="40px" v-if="['ECheckboxGroup'].includes(formItemElement.type)">
        <el-input-number-with-btn
          v-model="formItemAttribute.checkboxMin"
          :btn-list="[1, '清空']"
          placeholder="min"
          @change="setFormItemAttribute">
        </el-input-number-with-btn>
      </el-form-item>
      <el-form-item label="max" label-width="40px" v-if="['ECheckboxGroup'].includes(formItemElement.type)">
        <el-input-number-with-btn
          v-model="formItemAttribute.checkboxMax"
          :btn-list="[5, 10, '清空']"
          placeholder="max"
          @change="setFormItemAttribute">
        </el-input-number-with-btn>
      </el-form-item>
      <template v-if="['ESwitch'].includes(formItemElement.type)">
        <el-form-item label="inactive-text" label-width="100px">
          <el-row>
            <el-col :span="18">
            <el-input
              v-model.trim="formItemAttribute.inactiveText"
              placeholder="请输入inactive-text" clearable
              @change="setFormItemAttribute"
            ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="text" class="ml5" @click="formItemAttribute.inactiveText = '否';setFormItemAttribute();">否</el-button>
            </el-col>
          </el-row>

        </el-form-item>
        <el-form-item label="active-text" label-width="100px">
          <el-row>
            <el-col :span="18">
              <el-input
                v-model.trim="formItemAttribute.activeText"
                placeholder="请输入active-text" clearable
                @change="setFormItemAttribute"
              ></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="text" class="ml5" @click="formItemAttribute.activeText = '是';setFormItemAttribute();">是</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <switch-value-form @change="onChangeSwitchValue"></switch-value-form>
      </template>
      <legend>数据验证：</legend>
      <el-form-item label-width="0px">
        <el-checkbox
          v-if="!['ESwitch'].includes(formItemElement.type)"
          v-model="formItemAttribute.validatorRequired"
          :key="`formItemAttribute.validatorRequired${formItemAttribute.validatorRequired}`"
          @change="setFormItemAttribute"
        >是否必填(js检查)</el-checkbox>
        <el-checkbox
          v-model="formItemAttribute.validatorInt"
          :key="`formItemAttribute.validatorInt${formItemAttribute.validatorInt}`"
          @change="setFormItemAttribute"
          v-if="['EInputNumber'].includes(formItemElement.type)"
        >整数</el-checkbox>
        <el-checkbox
          v-model="formItemAttribute.validatorNaturalNum"
          :key="`formItemAttribute.validatorNaturalNum${formItemAttribute.validatorNaturalNum}`"
          @change="setFormItemAttribute"
          v-if="['EInputNumber'].includes(formItemElement.type)"
        >自然数</el-checkbox>
        <el-select
          v-model="formItemAttribute.validatorType"
          v-if="false"
          style="width:150px"
          clearable
          placeholder="数据类型"
          size="small"
          @change="setFormItemAttribute"
        >
          <el-option
            v-for="item in value_type_opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="min" label-width="40px" v-if="['EInputTrim', 'EInputNumber'].includes(formItemElement.type)">
        <el-input-number-with-btn
          v-model="formItemAttribute.validatorMin"
          :btn-list="[0, '清空']"
          placeholder="min"
          @change="setFormItemAttribute">
        </el-input-number-with-btn>
      </el-form-item>
      <el-form-item label="max" label-width="40px" v-if="['EInputTrim', 'EInputNumber'].includes(formItemElement.type)">
        <el-input-number-with-btn
          v-model="formItemAttribute.validatorMax"
          :btn-list="[20, 100, '清空']"
          placeholder="max"
          @change="setFormItemAttribute">
        </el-input-number-with-btn>
      </el-form-item>
      <legend>不常用属性：</legend>
      <el-form-item label-width="0px">
        <el-checkbox
          v-if="['EInputNumber'].includes(formItemElement.type)"
          v-model="formItemAttribute.controls"
          :key="`formItemAttribute.controls${formItemAttribute.controls}`"
          @change="setFormItemAttribute"
        >controls</el-checkbox>
        <el-checkbox
          v-if="['ERadioGroup'].includes(formItemElement.type)"
          :value="formItemAttribute.radioBorder"
          :key="`formItemAttribute.radioBorder${formItemAttribute.radioBorder}`"
          @change="(value) => toggleFormItemAttribute(value, 'radioBorder')"
        >全员border</el-checkbox>
      </el-form-item>
      <el-form-item label="step" v-if="['EInputNumber'].includes(formItemElement.type)">
        <el-input-number
          :min="0"
          v-model="formItemAttribute.step"
          @change="setFormItemAttribute"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="precision" v-if="['EInputNumber'].includes(formItemElement.type)">
        <el-input-number
          :min="0"
          v-model="formItemAttribute.precision"
          @change="setFormItemAttribute"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="placeholder" v-if="['EInputNumber'].includes(formItemElement.type)">
        <el-input v-model="formItemAttribute.placeholder"
          clearable
          @change="setFormItemAttribute"
        ></el-input>
      </el-form-item>
      <template v-if="['ESwitch'].includes(formItemElement.type)">
        <el-form-item label="width" label-width="40px">
          <el-input-number-with-btn
            v-model="formItemAttribute.width"
            :btn-list="[20, 50, '清空']"
            placeholder="width"
            @change="setFormItemAttribute">
          </el-input-number-with-btn>
        </el-form-item>
        <el-form-item label="inactive-icon-class" label-width="140px">
          <el-input
            v-model.trim="formItemAttribute.inactiveIconClass"
            placeholder="请输入inactive..." clearable
            @change="setFormItemAttribute"
          ></el-input>
        </el-form-item>
        <el-form-item label="active-icon-class" label-width="140px">
          <el-input
            v-model.trim="formItemAttribute.activeIconClass"
            placeholder="请输入active..." clearable
            @change="setFormItemAttribute"
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
  </el-card>
</template>

<script>
/**
 * @file 右栏的设置单个表单项的配置
 * 原来的FormItemDropAttr
 */
import { mapGetters } from 'vuex';
import changeCase from 'change-case';
import TextGroup from '@/views/FormEditor/components/FormItemAttr/components/TextGroup';
import SwitchValueForm from '@/views/FormEditor/components/FormItemAttr/components/SwitchValueForm';
import ElInputNumberWithBtn from '@/views/FormEditor/components/FormItemAttr/components/ElInputNumberWithBtn';
import { input_type_opts, value_type_opts, v_for_type_opts } from '@/views/FormEditor/components/opt.js';
import { deepCloneJSON } from '@/utils';
import { emitShowLabelArrayDialog, listenSubmitLabelArrayDialog } from '@/components/event-bus';

// const initFormItemAttribute = (() => {
//   const result = {
//     ...new EInputTrim(),
//     ...new EInputNumber(),
//     ...new ERadioGroup()
//   };
//   return () => deepClone(result);
// })();

// 收集对象数组中的所有auth属性，并且去重：
let HAS_V_FOR_ARR = v_for_type_opts.map(item => item.auth).reduce((acc, cur) => {
  return acc.concat(cur);
}, []);
HAS_V_FOR_ARR = [...new Set(HAS_V_FOR_ARR)];

export default {
  data () {
    return {
      input_type_opts,
      value_type_opts,
      v_for_type_opts,
      idx: 0,
      opt: '',
      formItemAttribute: {},
      formItemElement: {}
    };
  },
  computed: {
    ...mapGetters(['formItemToHandle']),
    hasVForComputed () {
      return HAS_V_FOR_ARR.includes(this.formItemElement.type);
    },
    vForTypeComputed () {
      return v_for_type_opts.filter(item => item.auth.includes(this.formItemElement.type));
    }
  },
  mounted () {
    listenSubmitLabelArrayDialog(list => {
      this.$set(this.formItemAttribute, 'labelArrayData', deepCloneJSON(list));
      this.setFormItemAttribute();
    });
  },
  watch: {
    formItemToHandle (val) {
      // if (val.added) {
      //   this.opt = 'add';
      //   this.idx = val.added.newIndex;
      //   this.formItemElement = val.added.element;
      //   this.formItemAttribute = { ...val.added.element.props };
      // } else {
      //   this.opt = 'others';
      //   this.idx = 0;
      //   this.formItemAttribute = {};
      // }
      if (val.type === 'click') {
        this.opt = 'click';
        this.idx = val.idx;
        this.formItemElement = {
          type: val.element.type,
          title: val.element.title
        };
        this.formItemAttribute = deepCloneJSON(val.element.props);
      }
    }
  },
  methods: {
    /**
     * @param value 必填
     * @param field 必填
     * 这个函数是为了在checkbox不勾选的时候，设置对应属性为 undefined：
     * 在生成代码的时候，值分别为 false 和 undefined 的结果是不一样的。
     */
    toggleFormItemAttribute (value, field) {
      this.formItemAttribute[field] = value ? true : undefined;
      this.setFormItemAttribute();
    },
    onChangeVForType (vForType) {
      if (vForType === 'labelArray') {
        this.setFormItemAttributeAndInitOthers('value2vForName');
      } else {
        this.setFormItemAttribute();
      }
    },
    setFormItemAttributeAndInitOthers (token) {
      const { formItemAttribute } = this;
      // 关于这行代码的逻辑，includes(this.formItemElement.type) 很难继续迭代，非常容易漏:
      if (token === 'value2vForName' && ['ERadioGroup', 'ECheckboxGroup', 'ESelect'].includes(this.formItemElement.type)) {
        const result = changeCase.upperCase(changeCase.snakeCase(formItemAttribute.value)) + '_LABEL_ARRAY';
        formItemAttribute.vForName = formItemAttribute.vForName || result;
      }
      this.setFormItemAttribute();
    },
    setFormItemAttribute () {
      // if (this.opt === 'add' || this.opt === 'click') {
      if (this.opt === 'click') {
        this.$store.commit('UPDATE_FORMITEM_OF_ITEMS', {
          idx: this.idx,
          formItem: {
            ...this.formItemElement,
            props: {
              ...this.formItemAttribute
            }
          }
        });
      }
    },
    onEditLabelArray (list) {
      emitShowLabelArrayDialog(list);
    },
    onChangeSwitchValue (attr) {
      const { formItemAttribute } = this;
      formItemAttribute.switchValueType = attr.switchValueType;
      formItemAttribute.inactiveValue = attr.inactiveValue;
      formItemAttribute.activeValue = attr.activeValue;
      this.setFormItemAttribute();
    },
    onChangeFormItemElement (value) {
      this.formItemElement.type = value;
      // 匹配出对应的title:
      this.formItemElement.title = (input_type_opts.find(item => item.value === value) || {}).label;
      this.formItemAttribute = {};
      this.setFormItemAttribute();
    }
  },
  components: {
    TextGroup,
    SwitchValueForm,
    ElInputNumberWithBtn
  }
};
</script>

<style lang="scss">
  .formitem-drop-attr__box-card {
    .el-form-item {
      margin-bottom: 16px;
    }
    legend {
      font-size: 14px;
      color: #858585;
      border-bottom: 1px solid #858585;
      margin-bottom: 8px;
    }
  }
</style>
