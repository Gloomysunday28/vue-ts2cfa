<h1 align=center>Vue TS转换CompositionAPI</h1>
<p align="center">
<img src="https://img.shields.io/badge/vue-2.6.x-important" /> <img style="margin-left: 10px" src="https://img.shields.io/badge/vue-3.x-success" /> 
</p>

## 诞生用途
用于更改vue-property-decorator到component-function-api的工具

## 背景介绍
由于Vue3的诞生, Vue的写法开始发生了变化，其中最引人注意的是Vue3推出的CompositionAPI，由于Vue2的以下两个特点:
- Vue2采用的是options写法，简便但缺乏灵活性，可操作空间太低
- Vue2由于过于依赖执行上下文，导致TS的支持度极差
Vue3推出的CompositionAPI极大程度上解决了以上的两个问题

在当前接手的项目中使用的是Vue2.x的TS语法，里面采用了vue-property-decorator的写法，在不升级到Vue3的前提下社区提供了@vue/composition-api包模拟了Vue3的写法, 在此条件下针对TS写法的Vue项目搭建了该工具，用于更改vue-property-decorator到component-function-api

## Installation
```
  npm i @kvinc/vue-component-api-command-tool -g
```
or
```
  yarn add global @kvinc/vue-component-api-command-tool
```

## Usage
项目根目录下执行以下命令
```javascript
  vts2cfa
```

## Options
这些是选项对象中的键

- -v: 查看当前版本
- -e: 传入入口文件夹, 以当前执行命令的目录为根目录, 默认src
- -o: 传入转换好的文件夹名称, 以当前执行命令的目录为根目录, 默认src-out
- -elimit: Error日志获取错误的信息的数量, 默认是1
- -h: 查看命令行帮助

## Enviroment
```javascript
  "@typescript-eslint/eslint-plugin": "^4.29.3",
  "@typescript-eslint/parser": "^4.29.3",
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-plugin-typescript": "~4.5.0",
  "@vue/cli-plugin-vuex": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "@vue/compiler-sfc": "^3.2.10",
  "eslint-plugin-prettier": "^3.4.1",
  "@vue/eslint-config-typescript": "^7.0.0",
  "eslint": "^6.7.2",
  "eslint-plugin-vue": "^7.17.0",
  "less": "^4.1.1",
  "less-loader": "7.3.0",
  "typescript": "~4.1.5",
  "vue-router": "~4.0.0",
  "vuex": "^4.0.2"
```

## TransformOptions
### export default
<br>

#### exapm1
```javascript
 export default class Name extends Vue {}
```
#### result
```javascript
  defineComponent({})
```

### name
#### example
```javascript
  @Component({
    name: 'table'
  })
  export default class extends Vue{}
```

```javascript
  name: 'table'
```

#### example2
```javascript
  @Component({
    name: 'Table'
  })
  export default MixinTable class extends Vue{}
```

#### result
```javascript
  name: 'Table'
```


### data

#### example
```javascript
  @Component({
    data() {
      return {
        name: 'name'
      }
    }
  })
```
#### result
```javascript
  defineComponent({
    data() {
      return {
        name: 'name'
      }
    }
  })
```

#### example2
```javascript
  class .... {
    [public | private | proctected] name: string = 'name'
  }
```

#### result
```javascript
  defineComponent({
    setup() {
      let name: string = 'name'

      return {
        name
      }
    }
  })
```

#### example3
```javascript
  class .... {
    [public | private | proctected] name: Array<unknown> = []
  }
```

#### result
```javascript
  defineComponent({
    setup() {
      let name: Array<unknown> = reactive([])

      return {
        name
      }
    }
  })
```

### props

#### example
```javascript
  @Prop({ type: String, default: 'name', required: false })
  name: string

  // OR

  @Components({
    props: {
      name: {
        type: String,
        default: 'name',
        required: false
      }
    }
  })
```

#### result
```javascript
  props: {
    name: {
      type: String,
      default: 'name',
      required: false
    }
  }
```
> i.g. 同时存在两种Props的话会合并， 相同的名称@Prop会覆盖@Components

### propSync
```javascript
  @PropSync('sync', { default: String }) syncProps
```
```javascript
  computed: {
    syncProps: {
      get() {
        return this.sync
      },
      set(value) {
        this.$emit('update:sync', value)
      }
    }
  }
```

### computed

#### example
```javascript
  get name() {
    return this.age
  }

  set name(value) {
    this.age = value
  }
```

#### result
```javascript
  computed: {
    name: {
      getter() {
        return this.age
      },
      setter(value) {
        this.age = value
      }
    }
  }
```
#### example2
```javascript
  @Component({
    computed: {
      name() {
        return this.age
      }
    }
  })
```

#### result
```javascript
  computed: {
    name() {
      return this.age
    }
  }
```

### watch

#### example
```javascript
  @Watch('name')
  getName(value) {}
```

#### result
```javascript
  watch: {
    name: function getName(value) {}
  }
```

#### example2
```javascript
  @Component({
    watch: {
      name: function(value) {

      }
    }
  })
```

#### result
```javascript
  watch: {
    getName(value) {}
  }
```

#### example3
```javascript
  @Component({
    watch: {
      name: function(value) {

      }
    }
  })

  @Watch('name')
  getName(value) {}
  // 两种同时存在
```

#### result
```javascript
  watch: {
    name: [function(value) {}, function getName(value) {}]
  }
```

#### example4
```javascript
  @Component({
    watch: {
      name: 'getName'
    }
  })
```

#### result
```javascript
   watch: {
    name: 'getName'
  }
```

#### example5
```javascript
  @Watch('name', { deep: true })
  getName() {}
```

#### result
```javascript
  methods: {
    getName() {}
  },
  watch: {
    handler: 'getName',
    deep: true
  }
```

### ref
#### example
```javascript
  @Ref('ref')
  name: string
```

#### result
```javascript
  computed: {
    name() {
      const ref: string = this.$refs['ref']
      return this.$refs['ref']
    }
  }
```

### mixins
#### example
```javascript
  class xxx extends Mixins(TableMixin)
```
#### result
```javascript
  mixins: [TableMixin]
```


#### example2
```javascript
  @Component({
    mixins: [TableMixin2]
  })
  class xxx extends Mixins(TableMixin)
```
#### result
```javascript
  mixins: [TableMixin, TableMixins2]
```


### Hooks
#### example
```javascript
  @Component({
    mounted() {}
  })
```

#### result
```javascript
  mounted(){}
```

#### example2
```javascript
  @Component({
    mounted() {
      console.log('mounted1')
    }
  })
  class extends Vue {
    mounted() {
      console.log('mounted2')
    }
  }
```

#### result
```javascript
  mounted: [function() {
      console.log('mounted1')
    }
  }, function() {
      console.log('mounted2')
    }
  }]
```

#### example3
```javascript
  beforeDetroy() {}
  destroyed() {}
```

#### result
```javascript
  beforeUnmount() {}
  unmounted() {}
```

### model
```javascript
  @Model('change', {
    type: Array,
    default: () => []
  })
  imgUrls!: string[]
```
```javascript
  model: {
    prop: 'imgUrls'
    event: 'change'
  },
```

### emit
```javascript
  @Emit('changeTrackerIds')
  changeTrackerIds(arg) {
    return this.trackIds
  }
```
```javascript
  methods: {
    changeTrackerIds(arg) {
      this.$emit('changeTrackerIds', this.trackIds, arg);
    }
  }
```

### filters / directives / components / render
原封不动的放回optionsAPI


## TransitionVuex
### State
```javascript
  @State('value') stateValue: string
```

```javascript
  computed: {
    stateValue() {
      const stateValue: string = this.$store.state['value']
      
      return stateValue
    }
  }
```

### Mutation
```javascript
  @Mutation('setRealTimeTestId') setRealTimeTestId
```
```javascript
  setRealTimeTestId(...rest) {
    return this.$store.commit.apply(this.$store,['setRealTimeTestId'].concat(rest));
  }
```
