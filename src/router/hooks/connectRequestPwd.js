import services from '@/services';
import store from '@/store';
let hasRequest = false;

export default function (router) {
  router.beforeEach((to, from, next) => {
    if (to.path !== 'login' && !hasRequest) {
      hasRequest = true;
      (async function () {
        try {
          const res = await services.get('/api/pwd');
          store.commit('SET_PWD', res.data.pwd);
        } catch (e) {
          store.commit('SET_IS_OFFLINE', true);
        }
      })()
    }
    next();
  });

  router.afterEach(route => {});
}
