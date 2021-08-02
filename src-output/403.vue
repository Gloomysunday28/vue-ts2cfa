<template>
<UPage403 :content="content" @click="handleClick" />
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
import { Component, Vue } from 'vue-property-decorator';
import { UPage403 } from '@ndsc/exception-page';
import { State } from 'vuex-class';
import { BizConfigDto } from '@/types/app.type'; // TODO: 无域访问权限时如何处理

export default defineComponent({
  methods: {
    handleClick() {
      const url: string = this.bizConfig.bdmsPermissionUrl;
      window.open(url);
    }

  }
});
</script>
  

