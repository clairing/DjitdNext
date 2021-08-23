<template>
  <Card title="表单示例">
    <Form ref="dxForm" />
  </Card>
</template>

<script>
import { Ez } from '/@/utils/devexpress';
import { defineComponent } from 'vue';
import Form from '/@/components/DxForm/index.vue';
export default defineComponent({
  components: {
    Form
  },
  // setup() {
  //   onMounted(() => {
  //     console.log(Ez);
  //     Ez.Form.Init('dxForm', 'kkkk', {}, {}, function () {});
  //     console.log(Ez.Form.Get('dxForm').bind(this));
  //   });
  // },
  // setup()     components: { Form },
  data() { },
  mounted() {
    this.loadData();
    console.log(Ez);
  },
  methods: {

  },
});
</script>

<style>
</style>
