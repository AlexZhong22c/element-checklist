<template>
  <section class="text-group">
    <draggable :list="tags" :group="draggableGroupOption" element="span"
      ghost-class="text-group-ghost">
      <el-tag :key="item+index" v-for="(item, index) in tags" closable disable-transitions
       @close="onDelete(index)">{{item}}</el-tag>
    </draggable>
    <el-input class="text-group-input-new-tag" v-model="inputNewTag" size="mini"
      v-if="inputNewVisible"
      @keyup.enter.native="onAdd" @blur="onAdd" clearable></el-input>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import deepClone from '@/utils/deep-clone';

export default {
  props: {
    maxlength: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      tags: deepClone(this.value),
      inputNewTag: '',
      draggableGroupOption: { name: 'text-group' }
    };
  },
  methods: {
    onDelete (index) {
      this.tags.splice(index, 1);
    },
    onAdd () {
      const { inputNewTag } = this;
      if (inputNewTag) {
        this.tags.push(inputNewTag);
      }
      this.inputNewTag = '';
    }
  },
  watch: {
    tags (value) {
      this.$emit('input', deepClone(value));
    }
  },
  computed: {
    inputNewVisible () {
      const { maxlength } = this;
      return !maxlength || this.tags.length < maxlength;
    }
  },
  components: {
    draggable
  }
}
</script>

<style lang="scss">
.text-group {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .el-tag {
    cursor: move;
  }
  .text-group-input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}

</style>
