// axios创建器
import core from './lib/core';

// axios配置
import config from './config';

// 拦截器
import {
  requestFulfilledHooks,
  responseFulfilledHooks
} from './fulfilledHooks/index';

import rejectedHookOfAll from './rejectedHookOfAll';

// eslint-disable-next-line new-cap
const http = new core({
  config,
  requestFulfilledHooks,
  responseFulfilledHooks,
  rejectedHookOfAll
});

const get = url => http({
  ...config,
  method: 'get',
  url
});

const post = (url, params) => http({
  ...config,
  method: 'post',
  data: params,
  url
});

export default {
  http,
  get,
  post
}