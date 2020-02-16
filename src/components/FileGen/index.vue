<template>
  <el-button
    v-bind="$attrs"
    type="text"
    @click="genLocalFile(srcFormCode,$event)"
  >
    输出代码文件
  </el-button>
</template>

<script>
import { mapGetters } from 'vuex';
import services from '@/services';

export default {
  computed: {
    ...mapGetters(['srcFormCode', 'srcTableCode']),
    srcCode () {
      console.log('------rcCode -> this.$router', this.$route)
      if (this.$route.path.includes('form')) {
        return this.srcFormCode
      }

      if (this.$route.path.includes('table')) {
        return this.srcTableCode
      }
      return ''
    }
  },
  methods: {
    async genLocalFile () {
      try {
        const res = await services.post('/api/genlocalfile', { code: this.srcCode })
        if (!res.status || res.status !== 'success') {
          throw new Error('服务器处理异常');
        }
        this.$message.success('输出代码文件成功');
      } catch (e) {
        this.$message.error('输出代码文件需要后端支持');
      }
    }
  }
}
</script>
