<template>
  <table-layout :navList="navList">
    <div class="home FBH FBJC">
      <div class="home-content FBV">
        <question-top />
        <div class="" v-if="products">
          <router-view />
        </div>
      </div>
    </div>
  </table-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, State } from 'vuex-class'

import Layout from './Layout.vue'
import { navList } from './home/config'
import QuestionTop from './question-top.vue'

const CommonM = namespace('common')

@Component({
  components: {
    'table-layout': Layout,
    'question-top': QuestionTop,
  },
})
export default class Home extends Vue {
  navList = navList;

  @CommonM.State products;
  @CommonM.Action('a') getProducts;
  @State('bb') aaa

  created() {
    this.getProducts()
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;
  padding: 16px 0;
  background-color: #f8f9fb;

  .home-content {
    width: 1100px;
    // height: 100%;
    background-color: #fff;

    .question-container {
      height: 1px;
    }
  }
}
</style>
