// 把json的下一层返回给业务层：
const resDataName = 'result';

export default function (response) {
  const finalReturn = response.data;
  finalReturn[resDataName] = finalReturn[resDataName] || {};
  return finalReturn;
}
