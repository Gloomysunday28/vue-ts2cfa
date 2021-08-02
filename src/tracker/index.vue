<template>
  <div class="top">
    <div class="flex-ac">
      <u-icon-button icon="left" class="g-mr-8" style="margin-top: 1px" @click="back" />
      <a-breadcrumb>
        <a-breadcrumb-item>
          <a href="javascript: void(0)" @click="back">对象管理</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>对象详情</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="g-mt-4" style="margin-left: 22px">
      <span>oid：{{ oid }}</span>
      <span class="g-ml-24">名称：{{ name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class BackToList extends Vue {
  @Prop() oid: string
  @Prop() name: string

  back() {
    this.$router
      .replace({
        path: '/tracker/object/list'
      })
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>
.top {
  border-bottom: 1px solid @border-color-split;
  padding: 12px 0 8px 0;
}
</style>
