// request fulfilled 拦截器
import requestDecideUrlPrefix from './requestDecideUrlPrefix';

// response fulfilled 拦截器
import responseServerError from './responseServerError';
import responseBaseError from './responseBaseError';
import responseResetReturn from './responseResetReturn';

// 顺序从该钩子数组 后往前 执行：
export const requestFulfilledHooks = [
  requestDecideUrlPrefix
];
// 顺序从该钩子数组 前往后 执行：
export const responseFulfilledHooks = [
  responseServerError,
  responseBaseError,
  responseResetReturn
];
