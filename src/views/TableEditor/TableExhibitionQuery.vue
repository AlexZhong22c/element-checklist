<template>
  <div class="table-query">
    <div>
      查询项
      <span
        v-for="header in headers"
        :key="header.key"
      >
        <el-tag
          v-if="header.query"
          type="primary"
          style="margin-left:10px"
        >{{ header.label }}</el-tag>
      </span>
    </div>
    <div>
      <el-button
        type="text"
        @click="handleClipboard(srcTableCode,$event)"
      >
        复制代码
      </el-button>
      <el-button type="text" @click="skipToEditorCode">在线查看代码</el-button>
      <FileGen v-if="!isOffline"/>
    </div>
  </div>
</template>

<script>
import FileGen from '@/components/FileGen';
import { mapGetters } from 'vuex';
import { handleClipboard } from '@/utils';

export default {
  components: {
    FileGen
  },
  props: {
    headers: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['srcTableCode', 'isOffline'])
  },
  methods: {
    handleClipboard (text, evnet) {
      handleClipboard(text, evnet).then(() => {
        this.$message.success('已经复制到剪贴板');
      });
    },
    skipToEditorCode () {
      this.$router.push('/code-editor').catch(err => err);
    }
  }
};
</script>

<style scoped>
.table-query {
  display: flex;
  justify-content: space-between;
}
</style>
