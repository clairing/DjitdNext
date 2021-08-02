<template>
  <div class="p-4">
    <a-card v-bind="$attrs" size="small">
      <slot></slot>
    </a-card>
  </div>
</template>
<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Card',
    components: {
      [Card.name]: Card,
    },
    setup() {},
  });
</script>
<style lang="scss" scoped></style>
