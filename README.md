<div style="text-align: center; font-size: 30px">Vue TS转换CompositionAPI</div>
<div style="display: flex; justify-content: center">
<img src="https://img.shields.io/badge/vue-2.6.0-important" /> <img style="margin-left: 10px" src="https://img.shields.io/badge/vue-3.x-success" />
</div>

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
- -h: 查看命令行帮助

## TransformExample
## export default
```javascript
 export default class Name extends Vue {}
```
### result
```javascript
  defineComponent({})
```

## data
```javascript
  @Component({
    data() {
      return {
        name: 'name'
      }
    }
  })
```
### result
```javascript
  defineComponent({
    data() {
      return {
        name: 'name'
      }
    }
  })
```

### example2
```javascript
  class .... {
    [public | private | proctected] name: string = 'name'
  }
```

### result
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

### example3
```javascript
  class .... {
    [public | private | proctected] name: Array<unknown> = []
  }
```

### result
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

## props
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

### result
```javascript
  props: {
    name: {
      type: String,
      default: 'name',
      required: false
    }
  }
```
i.g. 同时存在两种Props的话会合并， 相同的名称@Prop会覆盖@Components

## computed
```javascript
  get name() {
    return this.age
  }

  set name(value) {
    this.age = value
  }
```

### result
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
### example2
```javascript
  @Component({
    computed: {
      name() {
        return this.age
      }
    }
  })
```

### result
```javascript
  computed: {
    name() {
      return this.age
    }
  }
```

## watch
```javascript
  @Watch('name')
  getName(value) {}
```

### result
```javascript
  watch: {
    name: function getName(value) {}
  }
```

### example2
```javascript
  @Component({
    watch: {
      name: function(value) {

      }
    }
  })
```

### result
```javascript
  watch: {
    getName(value) {}
  }
```

### example3
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

### result
```javascript
  watch: {
    name: [function(value) {}, function getName(value) {}]
  }
```

### example4
```javascript
  @Component({
    watch: {
      name: 'getName'
    }
  })
```

### result
```javascript
   watch: {
    name: 'getName'
  }
```

## ref
```javascript
  @Ref('ref')
  name
```

### result
```javascript
  computed: {
    name() {
      return this.$refs['ref']
    }
  }
```

## filters / directives / mixins
原封不动的放回optionsAPI