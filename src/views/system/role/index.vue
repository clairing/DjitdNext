<template>
  <DataGrid :data-source="dataSource">
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxColumn data-field="code" caption="角色编码" />
    <DxColumn data-field="name" caption="角色名称" />
    <DxColumn data-field="sortNum" caption="排序" />
    <DxColumn data-field="description" caption="描述" />
    <DxColumn data-field="num" caption="排序" />
    <DxColumn data-field="cbyTime" caption="创建时间" data-type="date" format="yyyy-MM-dd HH:mm:ss" />
  </DataGrid>
</template>

<script>
import { DataGrid } from '/@/components/DxDataGrid';
import { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
import { defineComponent, ref } from 'vue';
import { Ez } from "/@/utils/devexpress";

export default defineComponent({
  name: 'Application',
  components: {
    DataGrid,
    DxColumn,
    DxEditing,
  },
  setup() {
    const dataSource = ref(null);
    loadDataSource();
    function loadDataSource() {
      const url = "/api/role";
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
      });
    }

    return {
      dataSource,
    };
  },
});
</script>
