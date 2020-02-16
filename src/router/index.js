import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/components/Layout';
import hooks from './hooks';

Vue.use(VueRouter);

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: '首页',
      component: Layout,
      redirect: 'dashboard',
      meta: {
        title: '首页',
        icon: 'el-icon-s-home'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/Dashboard')
        }
      ]
    },
    {
      path: '/form',
      component: Layout,
      meta: {
        title: '表单生成',
        icon: 'el-icon-s-marketing'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/FormEditor')
        }
      ]
    },
    {
      path: '/table',
      component: Layout,
      meta: {
        title: '表格生成',
        icon: 'el-icon-notebook-2'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/TableEditor/index.js')
        }
      ]
    },
    // {
    //   path: '/option-editor',
    //   component: Layout,
    //   meta: {
    //     title: '标签编辑',
    //     icon: 'el-icon-s-flag'
    //   },
    //   children: [
    //     {
    //       path: '',
    //       component: () => import('./views/OptionEditor/index')
    //     }
    //   ]
    // },
    {
      path: '/code-editor',
      component: Layout,
      meta: {
        title: '在线查看代码',
        icon: 'el-icon-s-platform'
      },
      children: [
        {
          path: '',
          component: () => import('@/views/Monaco/index')
        }
      ]
    }
  ]
});

hooks(router);

export default router;