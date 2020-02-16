<template>
  <div>
    <el-card>
      <div slot="header">
        <span>项目说明</span>
      </div>
      <div v-if="isOffline">
        <h3>目前只有静态页面，“选择文件保存路径，输出代码文件”的功能需要后端接口支持</h3>
      </div>
      <span>@TODO:</span>
    </el-card>
    <el-card class="box-card" v-if="!isOffline">
      <div
        slot="header"
      >
        <span>常用生成文件路径</span>
      </div>
      <div>
        <h3>当前生成路径：</h3>{{ pwd }}
      </div>
      <h3>收藏的路径</h3>
      <div
        v-for="(pwd,idx) in custom_pwds"
        :key="idx"
        style="margin:10px"
      >
        <el-button
          size="mini"
          icon="el-icon-check"
          @click="setPWD(pwd,idx)"
        />
        <el-button
          size="mini"
          icon="el-icon-delete"
          @click="remvoeCustomPWD(idx)"
        />
        {{ pwd }}
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {};
  },
  computed: {
    ...mapGetters(['pwd', 'pwd_segments', 'custom_pwds', 'isOffline'])
  },
  created () {
    const custom_pwds_str = localStorage.getItem('element-checklist-custom_pwd_list');
    if (custom_pwds_str) {
      const custom_pwds = JSON.parse(custom_pwds_str);
      const firstCustom = custom_pwds[0];
      this.$store.commit('SET_CUSTOM_PWDS', custom_pwds);
      if (firstCustom) {
        this.$store.commit('SET_PWD', firstCustom);
      }
    }
  },
  methods: {
    setPWD (pwd, idx) {
      this.$store.commit('SET_PWD', pwd);
      this.$store.commit('EXCHANGE_CUSTOM_PWDS', idx);
    },
    remvoeCustomPWD (idx) {
      this.$store.commit('DELETE_CUSTOM_PWDS', idx);
    }
  }
};
</script>
