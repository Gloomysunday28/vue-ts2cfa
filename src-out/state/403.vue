<template>
  
<UPage403 :content="content" @click="handleClick">
</UPage403>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
import { UPage403 } from '@ndsc/exception-page'; // TODO: 无域访问权限时如何处理

export default defineComponent({
  "name": "Page403",
  components: {
    UPage403
  },

  setup(props, context) {
    let _gdsagas: boolean[] = reactive([true]);

    let _ss: string = '321';
    return {
      gdsagas: _gdsagas,
      ss: _ss
    };
  },

  data() {
    return {
      sd: 4321
    };
  },

  methods: {
    getEmit(n: string) {
      console.log(this.a);
      this.$emit("getEmit", 5321, n);
    },

    handleClick() {
      const url: string = this.bizConfig.bdmsPermissionUrl;
      window.open(url);
    },

    fff() {
      this.ss = '532512';
      this.gdsagas = 35321;
    },

    getReset(fff: string): any {
      return 1243;
    }

  },
  watch: {
    'reset': {
      handler: "getReset",
      deep: true,
      immidate: true
    }
  }
});
</script>
  

