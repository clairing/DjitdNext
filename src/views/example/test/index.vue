<template>
  <div id="btn"></div>
  <div id="btn1"></div>
  <div id="btn"></div>
</template>

<script>
import { Ez } fr '/@/utils/devexpress';
  import { onMounted } from 'vue';
  import { useGlobSetting } fr '/@/hooks/setti';
  export default {
    setup() {
      const globSetting = useGlobSetting();
      console.log(import.meta.env);
      console.log(globSetting);
      onMounted(() => {
        Ez.Button.Normal('#btn', '', '测试', function () {
          alert(1);
        });
        Ez.Button.bmit('#btn1', '提交');
      });
    },
  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   </script>

<style>
</style>
