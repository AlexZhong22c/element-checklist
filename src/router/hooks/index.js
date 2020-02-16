import connectRequestPwd from './connectRequestPwd';

export default function (router) {
  [connectRequestPwd].forEach(h => {
    h(router);
  });
}
