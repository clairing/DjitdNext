
<template>
  <span :class="[prefixCls, theme]" class="application-icon" @click="showAppDrawer">
    <Icon icon="ion:grid-outline" />
  </span>
  <AppDrawer @register="registerDrawer" @success="handleSuccess" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';
import { Icon } from '/@/components/Icon';
import { useDrawer } from '/@/components/Drawer';
import AppDrawer from './AppDrawer.vue';
export default defineComponent({
  name: 'HeaderTrigger',
  components: { MenuUnfoldOutlined, MenuFoldOutlined, Icon, AppDrawer },
  props: {
    theme: propTypes.oneOf(['light', 'dark']),
  },
  setup() {
    const [registerDrawer, { openDrawer }] = useDrawer();
    console.log(registerDrawer);
    console.log(openDrawer);

    function showAppDrawer() {
      openDrawer(true, {})
    }
    // 处理选择成功的
    function handleSuccess() {
      alert(1);
    }
    const { prefixCls } = useDesign('layout-header-trigger');
    return { showAppDrawer, registerDrawer, handleSuccess, prefixCls };
  },
});
</script>
<style  scoped>
.application-icon {
  color: #000;
}
</style>
