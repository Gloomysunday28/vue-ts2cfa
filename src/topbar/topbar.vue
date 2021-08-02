<template>
  <div>
    <top-bar
      ref="topbar"
      :navigations="navigations"
      :starAppList="starAppList"
      :product-list="appList"
      :userName="user.userName"
      :product="app && app.name"
      @edit="handleEdit"
      @switchProduct="switchApp"
      @logout="logout"
    >
      <template #logo>
        <img :src="logo" alt="" />
      </template>
      <template slot="leftExtra">
        <a class="c-help__center" href="//kms.netease.com/topics/topic/294" target="_blank"
          >帮助中心</a
        >
      </template>
    </top-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { TopBar } from './topbar/index'
import { State } from 'vuex-class'
import { User, AppDto } from '@/types/app.type'
import loginService from '@/services/login.service'
const logo = require('@/assets/logo.svg')

@Component({
  name: 'u-topbar',
  components: {
    TopBar
  }
})
export default class UTopBar extends Vue {
  @State('user') user: User
  @State('app') app: AppDto
  @State('appList') appList: AppDto[]

  @Ref('topbar') topbar!: TopBar

  logo = logo
  starAppList = ['tracker']

  get navigations() {
    return [
      {
        key: 'collect',
        category: '埋点管理中心',
        order: 1,
        name: '数据采集',
        iconName: 'icon-collect',
        url: '/collect'
      },
      {
        key: 'tracker',
        category: '埋点管理中心',
        order: 1,
        name: '埋点管理',
        iconName: 'icon-tracker',
        url: '/tracker'
      },
      {
        key: 'test',
        category: '埋点管理中心',
        order: 1,
        name: '埋点测试',
        iconName: 'icon-test',
        url: '/test'
      },
      {
        key: 'monitor',
        category: '埋点管理中心',
        order: 1,
        name: '质量监控',
        iconName: 'icon-monitor',
        url: '/monitor'
      },
      {
        key: 'productAnalysis',
        category: '流量分析中心',
        order: 2,
        name: '产品分析',
        iconName: 'icon-product-analysis',
        url: '/productAnalysis'
      },
      {
        key: 'userAnalysis',
        category: '流量分析中心',
        order: 2,
        name: '用户分析',
        iconName: 'icon-user-analysis',
        url: '/userAnalysis'
      },
      {
        key: 'customerAnalysis',
        category: '流量分析中心',
        order: 2,
        name: '获客分析',
        iconName: 'icon-customer-analysis',
        url: '/customerAnalysis'
      },
      {
        key: 'selfAnalysis',
        category: '流量分析中心',
        order: 2,
        name: '自助分析',
        iconName: 'icon-self-analysis',
        url: '/selfAnalysis'
      }
    ]
  }

  created() {
    const starAppList = localStorage.getItem('starAppList')
    if (starAppList) {
      try {
        const arr = JSON.parse(starAppList)
        if (arr instanceof Array) {
          this.starAppList = arr
        }
      } catch (e) {}
    }
  }

  handleEdit(starList: string[]) {
    this.starAppList = starList
    localStorage.setItem('starAppList', JSON.stringify(starList))
    this.topbar && this.topbar.exitEditMode()
  }

  // TODO: 产品切换时体验优化
  switchApp(item: AppDto) {
    const { id } = item
    if (this.app.id === id) {
      return
    }

    const url = window.location.origin + `?appId=${id}`
    window.location.replace(url)
  }

  logout() {
    loginService.logOut()
  }
}
</script>

<style scoped lang="less">
.c-help__center {
  color: rgba(255, 255, 255, 0.72);
  margin-right: 10px;
  &:hover {
    color: #fff;
  }
}
</style>
