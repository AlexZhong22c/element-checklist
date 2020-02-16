/* eslint-disable no-console */
export default function (error = {}) {
  if (error.status) {
    // 进入这个if分支，对应上游执行的是 throw response :(此时error就是response，所以才会有status属性)
    throw error.data;
  }

  if (error.message && error.message.includes('Network Error')) {
    console.log('Network Error')
    throw error;
  }

  if (error.message && error.message.includes('timeout')) {
    console.log('timeout')
    throw error;
  }

  if (error.message && error.message.includes('404')) {
    console.log('404')
    throw error;
  }

  console.info('error was happened in service');
  throw error;
}
