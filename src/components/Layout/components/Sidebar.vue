<template>
  <div class="sidebar-wrapper">
    <router-link to="/">
      <h1 class="siderbar__project-name"
      >element checklist</h1>
    </router-link>&nbsp;
    <a
      href="https://github.com/AlexZhong22c/element-checklist"
      target="_blank"
      style="font-size: 12px;"
    >github
    </a>
    <el-menu
      style="float:right"
      :default-active="$route.path"
      active-text-color="#2052af"
      mode="horizontal"
    >
      <el-menu-item
        v-for="menuItem in menuItems"
        :key="menuItem.path"
        :index="String(menuItem.path)"
        @click="skipCurrent(menuItem.path)"
      >
        <span slot="title">{{ menuItem.meta.title }}</span>
        <i :class="menuItem.meta.icon" />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isCollapse: true
    };
  },
  computed: {
    menuItems () {
      return this.$router.options.routes;
    }
  },
  methods: {
    skipCurrent (path) {
      this.$router.push({ path }).catch(err => err);
    }
  }
};
</script>
<style scoped>
.sidebar-wrapper {
  height: 100%;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px solid #dcdfe6;
}
.siderbar__project-name {
  color: #193ca0;
  float:left;
  margin-left:10px;
  line-height:60px;
  margin-top:0;
  margin-bottom:0;
  padding:0;
}

</style>

<style>
/* .left-enter, .left-leave-to {
      transform: translate3d(-100%, 0, 0)
    }
    .left-leave, .left-enter-to {
      transform: translate3d(0, 0, 0)
    }
    .left-enter-active, .left-leave-active {
      transition: all .2s
    }
    .top-enter, .top-leave-to {
      transform: translate3d(0, -100%, 0)
    }
    .top-leave, .top-enter-to {
      transform: translate3d(0, 0, 0)
    }
    .top-enter-active, .top-leave-active {
      transition: all .2s
    } */
</style>
