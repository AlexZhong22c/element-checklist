<template>
  <el-dialog :visible.sync="labelArrayDialogVisible" title="编辑labelArray" width="680px" class="label-array-dialog"
    :close-on-click-modal="false">
    <p class="label-array-dialog__table-tips">所有alias非必填</p>
    <section class="label-array-dialog__table">
      <div class="label-array-dialog__tr">
        <div class="label-array-dialog__td w25p">label(文字)</div>
        <div class="label-array-dialog__td w40p">value</div>
        <div class="label-array-dialog__td w20p">alias(别名)<el-button type="text" class="ml5" @click="toUpperCaseAlias">大写化</el-button></div>
        <div class="label-array-dialog__td">操作</div>
      </div>
      <!-- 能滚动区域 -->
      <draggable element="section" v-model="labelArrayTableData"
        class="label-array-dialog__tbody"
        v-perfectScrollbar :options="labelArrayTableDragOption">
        <div v-for="(tr, trIndex) in labelArrayTableData"
          :key="trIndex" class="label-array-dialog__tr"
        >
          <div class="label-array-dialog__td w25p">
            <span>{{trIndex+1}}、</span>
            <el-input placeholder="请输入label(文字)" clearable
              :maxlength="50" v-model="tr.label"
            ></el-input>
          </div>
          <div class="label-array-dialog__td w40p">
            <el-select
              v-model="tr.valueType"
              @change="(value) => onChangeValueType(tr, value)"
              style="width:100px;" class="mr5"
              placeholder="类型">
              <el-option
                v-for="(item) in valueTypeOptions"
                :value="item" :key="item"
              ></el-option>
            </el-select>
            <el-input-number v-model="tr.value" :min="0" v-if="tr.valueType === 'number'"></el-input-number>
            <el-input
              v-model="tr.value" v-if="tr.valueType === 'string'"
              style="width:130px;" class="reset-input-align-center"
            ></el-input>
          </div>
          <div class="label-array-dialog__td w20p">
            <el-input placeholder="alias(别名)" clearable
              :maxlength="50" v-model="tr.alias"
            ></el-input>
          </div>
          <div class="label-array-dialog__td">
            <i class="el-icon-sort label-array-dialog__move-icon"></i>
            <i class="el-icon-close label-array-dialog__delete-icon pointer"
              @click="deleteLabelArrayItem(trIndex)"></i>
          </div>
        </div>
      </draggable>
      <div class="label-array-dialog__tr">
        <div class="label-array-dialog__td label-array-dialog__add-btn-td">
          <span @click="addLabelArrayItem" class="pointer">
            <i class="el-icon-plus"></i>添加</span>
        </div>
      </div>
    </section>

    <div class="text-right mt10">
      <el-button size="small" @click="labelArrayDialogVisible = false">取消</el-button>
      <el-button size="small" type="primary" @click="submitLabelArrayDialog">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import { deepCloneJSON } from '@/utils';
import { listenShowLabelArrayDialog, emitSubmitLabelArrayDialog } from '@/components/event-bus';

function initTableItem () {
  return { label: '', value: 4, alias: '', valueType: 'number' };
}
export default {
  data () {
    return {
      labelArrayDialogVisible: false,
      labelArrayTableData: [],
      labelArrayTableDragOption: {
        animation: 0,
        group: 'labelArray',
        ghostClass: 'ghost',
        handle: '.el-icon-sort'
      },
      valueTypeOptions: [
        'number', '0', '1', 'string'
      ]
    };
  },
  created () {
    listenShowLabelArrayDialog(list => {
      this.labelArrayTableData = list ? deepCloneJSON(list) : [];
      this.labelArrayDialogVisible = true;
    });
  },
  components: {
    draggable
  },
  methods: {
    deleteLabelArrayItem (index) {
      this.labelArrayTableData.splice(index, 1);
    },
    addLabelArrayItem () {
      this.labelArrayTableData.push(initTableItem());
    },
    submitLabelArrayDialog () {
      const { labelArrayTableData } = this;
      for (let i = 0, len = labelArrayTableData.length; i < len; i++) {
        const item = labelArrayTableData[i];
        if (!item.label) {
          return this.$message.warning(`第${i + 1}项的label不得为空`);
        }
        if (!item.value && item.value !== 0) {
          return this.$message.warning(`第${i + 1}项的value不得为空`);
        }
        if (Array.from(new Set(this.labelArrayTableData.map(item => item.value))).length < this.labelArrayTableData.length) {
          return this.$message.warning(`每一项的value应该各不相同`);
        }
      }
      this.labelArrayDialogVisible = false;
      emitSubmitLabelArrayDialog(labelArrayTableData);
    },
    toUpperCaseAlias () {
      const result = deepCloneJSON(this.labelArrayTableData);
      result.forEach(item => {
        if (item.alias) {
          item.alias = item.alias.toUpperCase();
        }
      });
      this.labelArrayTableData = result;
    },
    onChangeValueType (tr, value) {
      switch (value) {
        case '0':
        case '1':
          tr.value = parseInt(value, 10);
          break;
        case 'string':
          tr.value = String(tr.value || '');
          break;
        case 'number':
          tr.value = parseInt(tr.value, 10);
          break;
      }
    }
  }
}
</script>

<style lang="scss">
/*
  *label-array-dialog
*/
$label-array-table-border-color: #AEAEAE;
.label-array-dialog {
  .pointer {
    cursor: pointer;
  }
}
.label-array-dialog__table-tips {
  margin-bottom: 10px;
}
.label-array-dialog__table {
  border-right: 1px solid $label-array-table-border-color;
  border-bottom: 1px solid $label-array-table-border-color;
}
.label-array-dialog__add-btn-td {
  height: 40px;
  align-items: center;
  justify-content: center;
}
.label-array-dialog__move-icon {
  font-size: 18px;
  cursor: move;
}
.label-array-dialog__delete-icon {
  font-size: 22px;
  margin-left: 10px;
  margin-top: 2px;
}
.label-array-dialog__choose-example {
  line-height: 22px;
  margin-left: 10px;
  margin-top: 2px;
}
.label-array-dialog__tr {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.label-array-dialog__td {
  display: flex;
  border-top: 1px solid $label-array-table-border-color;
  border-left: 1px solid $label-array-table-border-color;
  box-sizing: border-box;
  flex: 1;
  align-items: center;
  line-height: 40px;
  padding-left: 8px;
  &.w10p {
    flex: 0 0 10%;
  }
  &.w20p {
    flex: 0 0 20%;
  }
  &.w25p {
    flex: 0 0 25%;
  }
  &.w30p {
    flex: 0 0 30%;
  }
  &.w40p {
    flex: 0 0 40%;
  }
  &.w50p {
    flex: 0 0 50%;
  }
  &.w60p {
    flex: 0 0 60%;
  }
  &.w100p {
    flex: 0 0 100%;
  }
}
.label-array-dialog__tbody {
  max-height: 600px;
  overflow: hidden;
  position: relative;
  .label-array-dialog__td {
  padding: 10px;
  }
}
</style>
