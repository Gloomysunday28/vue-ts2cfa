<template>
  <a-config-provider :locale="zhCN" :autoInsertSpaceInButton="false" :renderEmpty="renderEmpty">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { State } from 'vuex-class'
import watermark from 'watermark-dom'

@Component({
  components: {
    'a-config-provider': ConfigProvider
  }
})
export default class App extends Vue {
  zhCN = zhCN

  /**
   * antd 组件空态统一处理
   */
  renderEmpty(h, componentName: string) {
    const style =
      componentName === 'Select'
        ? 'text-align: center;margin: 16px 0 40px 0;'
        : 'text-align: center;margin: 8px 0;'
    const text = componentName === 'Select' ? '无数据' : '暂无数据'
    return (
      <div style={style}>
        <span>{text}</span>
      </div>
    )
  }

  mounted() {
    /**
     * 添加水印
     */
    const email = this.user?.email
    const userName = email.split('@')[0]
    if (userName) {
      watermark.init({
        watermark_txt: userName,
        watermark_fontsize: '16px',
        watermark_alpha: 0.05
      })
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
