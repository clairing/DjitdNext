<template>
  <DxButton
    :text="text"
    styling-mode="contained"
    :icon="icon"
    @click="click"
    :use-submit-behavior="useSubmitBehavior"
  />
</template>

<script>
  import { defineComponent } from 'vue';
  import DxButton from 'devextreme-vue/button';

  export default defineComponent({
    name: 'Button',
    components: {
      DxButton,
    },
    props: {
      text: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: '',
      },
      click: {
        type: Function,
        default: null,
      },
      icon: {
        type: String,
        default: '',
      },
      useSubmitBehavior: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style></style>
