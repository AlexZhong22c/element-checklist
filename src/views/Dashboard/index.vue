<template>
  <div>
    <el-card v-if="!isOffline" style="color:#3f3f3f;">
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
    <el-card class="mt10" style="color:#3f3f3f;">
      <div slot="header">
        <span>项目说明</span>
      </div>
      <div>
        <h3>功能汇总</h3>
        <pre>
- 在线预览代码
- 如果npm install了，在本地启动该npm包内的后端可以把代码文件输出到本地(待优化)
        </pre>
        <img src="https://gitee.com/az22c/element-checklist/raw/master/README_images/element-checklist_choose-pwd.png" alt="由后端支持输出代码文件" />
        <pre>
- [x] 将后端JSON接口返回字段，稍作修改，粘贴生成出组件的代码框架
- [x] 用UI交互来取代代码的编写：明显比直接编辑器编写代码快
- [ ] 支持为组件标注注释：这样方便先写TODO来记住后续需要如何修改
- [ ] 支持admin前后端代码一起生成

模块方面：

- [x] 表单 el-form：组件属性、控件供选项的设置
  - [x] 支持表单校验的JS逻辑
  - [x] 支持表单文字提示和校验错误提示一起显示的HTML逻辑
- [x] 表格 el-table：组件属性
  - [ ] el-table组件本身属性的设置
  - [x] 支持表格字段HTML灵活转为template格式
  - [x] 支持判断表格字段是否为查询字段(待完善)
- [x] 在线代码编辑器
  - [x] 支持多开浏览器tab间同步代码结果
        </pre>
      </div>
      <div>
        <h3>开始使用：本页右上角有导航</h3>
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
