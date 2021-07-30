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
  import { defineComponent, reactive } from '@vue/composition-api';
import { Component, Vue, Watch } from 'vue-property-decorator';
const menu = [{
  id: 'tree',
  name: '树形视图',
  to: '/pit/tree',
  role: 'page'
}, {
  id: 'position',
  name: '点位管理',
  to: '/pit/position',
  role: 'position'
}, {
  id: 'module',
  name: '模块管理',
  to: '/pit/module',
  role: 'module'
}, {
  id: 'subpage',
  name: '子页面管理',
  to: '/pit/subpage',
  role: 'page'
}, {
  id: 'page',
  name: '页面管理',
  to: '/pit/page',
  role: 'page'
}];
export default defineComponent({
  setup() {
    let gg: string = 'gg';
    let h: number = 1;
    let a = reactive({});
    let d: Array<number | string> = reactive([1231, 'stri']);
    return {
      gg,
      h,
      a,
      d
    };
  },

  props: {
    ggg: {
      default: 'gg',
      required: false,
      type: String
    },
    c: {
      default: 1
    },
    e: {
      default: () => [],
      type: Array,
      required: false
    }
  },

  data() {
    return {
      cjd: 1
    };
  }

});
</script>
  
<style lang="less" scoped="true">
.content {
  flex: 1;
  min-width: 0;
  height: 100%;
  position: relative;
  overflow-x: auto; // fix: firefox 内容区过宽不滚动，撑开页面
}
</style>
