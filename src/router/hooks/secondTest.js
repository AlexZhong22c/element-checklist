// 用于测试：
export default function (router) {
  router.beforeEach((to, from, next) => {
    console.log('before2 start');
    next();
    console.log('before2 end');
  });

  router.afterEach(route => {
    console.log('after2');
  });
}
