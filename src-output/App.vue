<template>
<a-config-provider :locale="zhCN" :autoInsertSpaceInButton="false" :renderEmpty="renderEmpty">
  <div id="app">
    <router-view />
  </div>
</a-config-provider>
</template>

<script lang="tsx">
  import { defineComponent, onMounted } from '@vue/composition-api';
import { Component, Vue } from 'vue-property-decorator';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { State } from 'vuex-class';
import watermark from 'watermark-dom';
export default defineComponent({
  setup() {
    let zhCN = zhCN;
    onMounted(function () {
      const email = this.user?.email;
      const userName = email.split('@')[0];

      if (userName) {
        watermark.init({
          watermark_txt: userName,
          watermark_fontsize: '16px',
          watermark_alpha: 0.05
        });
      }
    });
    return {
      zhCN
    };
  },

  methods: {
    renderEmpty(h, componentName: string) {
      const style = componentName === 'Select' ? 'text-align: center;margin: 16px 0 40px 0;' : 'text-align: center;margin: 8px 0;';
      const text = componentName === 'Select' ? '无数据' : '暂无数据';
      return <div style={style}>
        <span>{text}</span>
      </div>;
    }

  }
});
</script>
  
<style lang="less" scoped="true">
#app {
  height: 100%;
}
</style>
