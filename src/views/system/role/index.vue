<template>
  <Card title="角色管理">
    <DataGrid :data-source="dataSource">
      <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
      <DxColumn data-field="code" caption="角色编码" />
      <DxColumn data-field="name" caption="角色名称" />
      <DxColumn data-field="sortNum" caption="排序" />
      <DxColumn data-field="description" caption="应用描述" />
      <DxColumn data-field="num" caption="排序" />
      <DxColumn
        data-field="cbyTime"
        caption="创建时间"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      />
    </DataGrid>
  </Card>
</template>

<script>
  import { DataGrid } from '/@/components/DxDataGrid';
  import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
  import { DxColumn, DxEditing } from 'devextreme-vue/data-grid';
  import { defineComponent, ref } from 'vue';
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
        const http = 'https://localhost:44326';
        const url = `${http}/api/role`;
        dataSource.value = CreateStore({
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
