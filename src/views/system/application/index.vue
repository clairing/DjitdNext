<template>
  <DataGrid :data-source="dataSource">
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxColumn data-field="code" caption="系统编码" />
    <DxColumn data-field="name" caption="系统名称" />
    <DxColumn data-field="enName" caption="英文名称" />
    <DxColumn data-field="description" caption="系统描述" />
    <DxColumn data-field="isSeparated" data-type="boolean" caption="独立" />
    <DxColumn data-field="separateSite" caption="独立站点" />
    <DxColumn data-field="enabled" data-type="boolean" caption="失效" />
  </DataGrid>
</template>

<script>
import { DataGrid } from '/@/components/DxDataGrid';
import { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
import { defineComponent } from 'vue';
import { Ez } from "/@/utils/devexpress"

export default defineComponent({
  name: 'Application',
  components: {
    DataGrid,
    DxColumn,
    DxEditing,
  },
  setup() {
    const url = `/api/application`;
    const dataSource = Ez.CreateStore({
      key: 'id',
      loadUrl: `${url}/list`,
      insertUrl: `${url}/create-dev`,
      updateUrl: `${url}/update-dev`,
      deleteUrl: `${url}/delete`,
    });

    return {
      dataSource,
    };
  },
});
</script>
