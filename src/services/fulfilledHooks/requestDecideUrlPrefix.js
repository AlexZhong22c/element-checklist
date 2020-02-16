// const projectUrlPrefix = 'http://127.0.0.1:3000';

export default function (request) {
  // eslint-disable-next-line curly
  // if (!/^(http(|s):\/\/)|^\/\//.test(request.url))
  //   // request.url = projectUrlPrefix + request.url;
  return request;
}