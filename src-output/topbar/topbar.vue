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
  import { defineComponent, reactive } from '@vue/composition-api';
import { Component, Vue, Ref } from 'vue-property-decorator';
import { TopBar } from './topbar/index';
import { State } from 'vuex-class';
import { User, AppDto } from '@/types/app.type';
import loginService from '@/services/login.service';

const logo = require('@/assets/logo.svg');

export default defineComponent({
  name: 'u-topbar',

  setup() {
    let logo = logo;
    let starAppList = reactive(['tracker']);
    return {
      logo,
      starAppList
    };
  },

  created() {
    const starAppList = localStorage.getItem('starAppList');

    if (starAppList) {
      try {
        const arr = JSON.parse(starAppList);

        if (arr instanceof Array) {
          this.starAppList = arr;
        }
      } catch (e) {}
    }
  },

  methods: {
    handleEdit(starList: string[]) {
      this.starAppList = starList;
      localStorage.setItem('starAppList', JSON.stringify(starList));
      this.topbar && this.topbar.exitEditMode();
    },

    switchApp(item: AppDto) {
      const {
        id
      } = item;

      if (this.app.id === id) {
        return;
      }

      const url = window.location.origin + `?appId=${id}`;
      window.location.replace(url);
    },

    logout() {
      loginService.logOut();
    }

  }
});
</script>
  
<style scoped="true" lang="less">
.c-help__center {
  color: rgba(255, 255, 255, 0.72);
  margin-right: 10px;
  &:hover {
    color: #fff;
  }
}
</style>
