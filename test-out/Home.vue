<template>
<table-layout :navList="navList">
  <div class="home FBH FBJC">
    <div class="home-content FBV">
      <question-top></question-top>
      <div class="" v-if="products">
        <router-view></router-view>
      </div>
    </div>
  </div>
</table-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
import Layout from './Layout.vue';
import { navList } from './home/config';
import QuestionTop from './question-top.vue';
const CommonM = namespace('common');
export default defineComponent({
  "name": "Home",
  components: {
    'table-layout': Layout,
    'question-top': QuestionTop
  },

  setup(props, context) {
    let _navList = navList;
    return {
      navList: _navList
    };
  },

  computed: {
    aaa() {
      const aaa = this.$store.state['bb'];
      return aaa;
    },

    products() {
      const products = this.$store.state["products"];
      return products;
    }

  },

  created() {
    this.getProducts();
  },

  methods: {
    getProducts(...rest) {
      return this.$store.dispatch("common/a", ...rest);
    }

  }
});
</script>
  
<style lang="less" scoped="true">
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
