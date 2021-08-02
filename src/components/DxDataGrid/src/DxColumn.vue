<template> <dx-column v-bind="$props" /> </template>
<script lang="ts">
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Column',
    components: {
      DxColumn,
    },
    inheritAttrs: true,
    setup() {},
  });
</script>
<style lang="scss" scoped></style>
