<template>
  <UPage403 :content="content" @click="handleClick" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UPage403 } from '@ndsc/exception-page'
import { State } from 'vuex-class'
import { BizConfigDto } from '@/types/app.type'

// TODO: 无域访问权限时如何处理

@Component({
  components: {
    UPage403
  }
})
export default class Page403 extends Vue {
  @State('bizConfig') bizConfig!: BizConfigDto

  get content() {
    return '请申请加入相应产品获取访问权限'
  }

  handleClick() {
    const url: string = this.bizConfig.bdmsPermissionUrl
    window.open(url)
  }
}
</script>
