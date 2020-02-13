<template>
  <div>
    <div id="monaco" style="height:100vh"></div>
  </div>
</template>

<script>
/**
 * @file 因为不能监听到同一个浏览器tab的 storage 事件，所以只能先这样咯
 */
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
export default {
  mounted () {
    monaco.editor.setTheme('vs-dark');
    this.monacoInstance = monaco.editor.create(document.getElementById('monaco'), {
      value: this.code,
      language: 'html'
    });
  },
  data () {
    return {
      monacoInstance: ''
    };
  },
  watch: {
    codeType: {
      handler (val) {
        if (val === 'table') {
          window.addEventListener('storage', () => {
            this.getLocalTableCode();
          });
          this.getLocalTableCode();
        } else {
          window.addEventListener('storage', () => {
            this.getLocalFormCode();
          });
          this.getLocalFormCode();
        }
      },
      immediate: true
    }
  },
  computed: {
    codeType () {
      return this.$route.query.code;
    }
  },
  methods: {
    getLocalTableCode () {
      this.code = window.localStorage.getItem('vue-element-table-gen-code');
      this.monacoInstance && this.monacoInstance.setValue(this.code);
    },
    getLocalFormCode () {
      this.code = window.localStorage.getItem('vue-element-form-gen-code');
      this.monacoInstance && this.monacoInstance.setValue(this.code);
    }
  },
  beforeDestroy () {
    this.monacoInstance.dispose();
  }
};
</script>
