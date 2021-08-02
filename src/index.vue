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
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'

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

@Component({
  name: 'cjd',
  data() {
    return {
      cjd: 1
    }
  },
  directives: {
    bind(value) {

    },
    update() {

    }
  },
  mounted() {
    console.log(32131)
  },
  created(vvv) {
    console.log('created')
  },
  mixins: ['314', '531251'],
  props: {
    ggg: {
      default: 'gg',
      required: false,
      type: String
    }
  },
  computed: {
    cjd() {
      return this.a
    }
  },
  filters: {
    ff(value) {
      return value + 2 
    }
  },
  methods: {
    getAge() {
      this.age = 2
    }
  },
  watch: {
  	g() {
    },
    c: 'gg',
    h: [function f(h){
      console.log(h)
    }, 'cc']
  }
})
export default class PitConfig extends Vue {
  @Prop({default: 1})
  c: number

  @Prop({default: () => [], type: Array, required: false})
  e: number

  @Ref('aa')
  bbRef: string

  gg: string = 'gg'
  h: number = 1
  a = {}
  d: Array<number | string> = [1231, 'stri']
  get b() {
    return this.a
  }

  set b(value) {
  }

  get gd() {
    return 5321512
  }

  getMyName(value) {
    return value
  }

  mounted = function(value) {
    console.log(321)
  }

  created(value) {
    console.log(321)
  }

  beforeDestroy(value) {

  }

  destroyed(value) {

  }

  @Watch('333')
  getWatch(vealue) {
    console.log(vealue)
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
