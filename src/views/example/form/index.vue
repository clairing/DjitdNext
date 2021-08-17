<template>
  <button @click="gData">获取数据</button>
  <Form ref="dxForm" id="id" :options="options" />
</template>

<script>
import { Ez } fr '/@/utils/devexpress';
  import { defineComponent, ref, onMounted } from 'vue';
  importorm from '/@/comnents/DxForm/index.vue';

  // import dataSource from './data1';
  export default defineComponent({
    name: 'Form',
    components: { Form },
    setup() {
      const dxForm = ref();
      onMounted(() => {});
      const options = Ez.Form.Init2('');
      function getData()         // console.log(Ez.Form.Get(dxForm).formData);
      console.log(Ez.Form.Get(dxForm));
        // console.log(Form.instance);
      }
      return { dxForm, options, getData };
    
  });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   </script>

<style>
</style>
