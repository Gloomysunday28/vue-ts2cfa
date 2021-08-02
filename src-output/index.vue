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
  import { defineComponent, onMounted, onBeforeUnmount, onUnmounted, reactive } from '@vue/composition-api';
import { Component, Vue, Watch, Ref } from 'vue-property-decorator';
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
  name: 'cjd',
  directives: {
    bind(value) {},

    update() {}

  },
  mixins: ['314', '531251'],
  filters: {
    ff(value) {
      return value + 2;
    }

  },

  setup() {
    let gg: string = 'gg';
    let h: number = 1;
    let a = reactive({});
    let d: Array<number | string> = reactive([1231, 'stri']);
    onMounted(function () {
      console.log(321);
    });
    onBeforeUnmount(function () {});
    onUnmounted(function () {});
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
  computed: {
    b: {
      getter() {
        return this.a;
      },

      setter(value) {}

    },
    gd: {
      getter() {
        return 5321512;
      }

    },

    cjd() {
      return this.a;
    },

    lll: {
      setter(value) {},

      getter() {
        return value;
      }

    },

    bbRef() {
      const bbRef: string = this.$refs['aa'];
      return bbRef;
    }

  },

  data() {
    return {
      cjd: 1
    };
  },

  mounted() {
    console.log(32131);
  },

  created: [function (vvv) {
    console.log('created');
  }, function (value) {
    console.log(321);
  }],

  beforeRouteEnter(to, from, next) {
    console.log(to);
  },

  methods: {
    getAge() {
      this.age = 2;
    },

    getMyName(value) {
      return value;
    }

  },
  watch: {
    g: function g() {},
    c: "gg",
    h: [function f(h) {
      console.log(h);
    }, "cc"],
    '333': function getWatch(vealue) {
      console.log(vealue);
    }
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
