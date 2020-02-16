import axios from 'axios';

/**
 * @param {Object} config  axios配置
 * @param {Array} requestFulfilledHooks request拦截器数组
 * @param {Array} responseFulfilledHooks response拦截器数组
 * @param {Function} rejectedHookOfAll rejected函数
 */
export default class {
  constructor ({
    config = {},
    requestFulfilledHooks = [],
    responseFulfilledHooks = [],
    rejectedHookOfAll
  } = {}) {
    const instance = axios.create(config);

    requestFulfilledHooks.forEach(fulfilled => {
      instance.interceptors.request.use(fulfilled, null);
    });
    responseFulfilledHooks.forEach(fulfilled => {
      instance.interceptors.response.use(fulfilled, null);
    });

    if (rejectedHookOfAll) {
      instance.interceptors.response.use(null, rejectedHookOfAll);
    }

    return instance;
  }
}
