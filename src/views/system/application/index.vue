<template>
  <Card title="应用管理">
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
  </Card>
</template>

<script>
  import { DataGrid } from '/@/components/DxDataGrid';
  import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
  import { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
  import { defineComponent } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting'; // 获取env 设置的全局变量

  export default defineComponent({
    name: 'Application',
    components: {
      DataGrid,
      DxColumn,
      DxEditing,
    },
    setup() {
      debugger;
      const { urlPrefix } = useGlobSetting();
      const url = `${urlPrefix}/api/application`;
      const dataSource = CreateStore({
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
