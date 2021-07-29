<template>
  <div class="fill flex">
    <u-sidebar :navConfig="navConfig"></u-sidebar>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

const menu = [
  {
    id: 'tree',
    name: '树形视图',
    to: '/pit/tree',
    role: 'page'
  },
  {
    id: 'position',
    name: '点位管理',
    to: '/pit/position',
    role: 'position'
  },
  {
    id: 'module',
    name: '模块管理',
    to: '/pit/module',
    role: 'module'
  },
  {
    id: 'subpage',
    name: '子页面管理',
    to: '/pit/subpage',
    role: 'page'
  },
  {
    id: 'page',
    name: '页面管理',
    to: '/pit/page',
    role: 'page'
  }
]

@Component({})
export default class PitConfig extends Vue {
  get navConfig() {
    let m = menu.filter((item) => this.$hasModulePermission([item.role]))
    // 无子页面
    if (!this.HAS_SUB_PAGE) {
      m = m.filter((item) => item.id !== 'subpage')
    }
    return {
      menu: m
    }
  }

  @Watch('$route.path', { immediate: true })
  handleRouteRedirect(to: string) {
    if (to === '/pit') {
      const redirectPath = this.navConfig.menu[0]?.to
      if (redirectPath) {
        this.$router
          .replace({
            path: redirectPath
          })
          .catch(() => {})
      } else {
        this.$router
          .replace({
            path: '/404'
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1;
  min-width: 0;
  height: 100%;
  position: relative;
  overflow-x: auto; // fix: firefox 内容区过宽不滚动，撑开页面
}
</style>
