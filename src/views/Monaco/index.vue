<template>
  <div>
    <div id="monaco" style="height:100vh"></div>
  </div>
</template>

<script>
/**
 * @file 同时开2个浏览器tab来显示这个编辑器，2个编辑器内的代码可能不会完全同步。
 * 主要是beforeRouteEnter的判断逻辑不是很完善，但是目前是够用的。
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
export default {
  mounted () {
    monaco.editor.setTheme('vs-dark');
    this.monacoInstance = monaco.editor.create(document.getElementById('monaco'), {
      value: '',
      language: 'html'
    });
    this.storageHandler = (e) => {
      if (this.$route.path === '/code-editor') {
        // 因为这个组件会keep-alive，所以应该过滤掉监听的噪音。
        const { key } = e;
        if (key === 'vue-element-form-gen-code' || key === 'vue-element-table-gen-code') {
          this.codeRes = window.localStorage.getItem(key);
        }
      }
    };
    window.addEventListener('storage', this.storageHandler);
  },
  data () {
    return {
      monacoInstance: '',
      codeRes: ''
    };
  },
  watch: {
    codeRes (value) {
      this.monacoInstance && this.monacoInstance.setValue(value);
    }
  },
  beforeRouteEnter (to, from, next) {
    const { path } = from;
    let codeRes = '';
    if (path === '/form') {
      codeRes = window.localStorage.getItem('vue-element-form-gen-code');
    } else if (path === '/table') {
      codeRes = window.localStorage.getItem('vue-element-table-gen-code');
    }

    next(vm => {
      vm.codeRes = codeRes;
    })
  },
  methods: {
  },
  beforeDestroy () {
    this.monacoInstance.dispose();
    window.addEventListener('storage', this.storageHandler);
  }
};
</script>
