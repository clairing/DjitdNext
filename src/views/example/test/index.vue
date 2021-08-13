<template>
  <div id="btn"></div>
  <div id="btn1"></div>
  <div id="btn"></div>
</template>

<script>
  import Ez from '/@/utils/devexpress';
  import { onMounted } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  export default {
    setup() {
      const globSetting = useGlobSetting();
      console.log(import.meta.env);
      console.log(globSetting);
      onMounted(() => {
        Ez.Button.Normal('#btn', '', '测试', function () {
          alert(1);
        });
        Ez.Button.Submit('#btn1', '提交');
      });
    },
  };
</script>

<style></style>
