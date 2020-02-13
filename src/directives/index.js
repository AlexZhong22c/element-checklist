/**
 * 指令
 */
import perfectScrollbar from './perfect-scrollbar';

const directives = [
  perfectScrollbar
];

// eslint-disable-next-line no-unused-vars
const install = (Vue, opts = {}) => {
  directives.forEach(directive => {
    Vue.directive(directive.name, directive);
  });
};

export default {
  install
};
