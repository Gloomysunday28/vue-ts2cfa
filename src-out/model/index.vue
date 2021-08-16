<template>
<div>
  <a-input-search
    :value="search"
    :placeholder="placeholder"
    :style="`width: ${width}px`"
    @change="onChange"
    @search="onSearch"
    allowClear
  />
  <s-sync-button class="g-ml-12" @click="onSync" />
</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
export default defineComponent({
  name: 's-table-search',
  model: {
    prop: "search",
    event: 'change'
  },
  props: {
    placeholder: {},
    width: {
      type: Number,
      default: 280
    },
    search: {}
  },
  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },

    onSearch() {
      this.$nextTick(() => {
        this.$emit('search');
      });
    },

    onSync() {
      this.$emit('sync');
    }

  }
});
</script>
  

