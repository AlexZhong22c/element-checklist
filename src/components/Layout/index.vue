<template>
  <el-container>
    <el-header style="padding:0">
      <Sidebar :is-sidebar-collapse="isSidebarCollapse" />
    </el-header>
    <el-main>
      <AppMain />
    </el-main>
    <Footer v-if="!isOffline"/>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';
// import Navbar from './components/Navbar';
import AppMain from './components/AppMain';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default {
  components: {
    AppMain,
    Sidebar,
    Footer
  },
  computed: {
    ...mapGetters(['isOffline'])
  },
  data () {
    return {
      isSidebarCollapse: true
    };
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background-color: #f0f2f5;
}
.sidebar {
  height: 100%;
}
</style>
