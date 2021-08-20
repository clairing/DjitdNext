<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="12">
      <SystemManage @selectSys="onSelectSys" />
    </a-col>
    <a-col :span="12">
      <TenantList :tenantId="tenantId" />
    </a-col>
  </a-row>
</template>

<script>

import SystemManage from './components/SystemManage.vue';
import TenantList from "./components/TenantList.vue"
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: 'Application',
  components: {
    SystemManage,
    TenantList
  },
  setup() {
    // 选中系统获取租户列表
    const tenantId = ref('');
    function onSelectSys(data) {
      tenantId.value = data.value.id;
    }
    return { onSelectSys, tenantId }
  }
});
</script>

