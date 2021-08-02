<template>
  <Card title="系统管理">
    <DataGrid :data-source="dataSource">
      <DxColumn data-field="code" caption="系统编码" />
      <DxColumn data-field="name" caption="系统名称" />
      <DxColumn data-field="enName" caption="英文名称" />
      <DxColumn data-field="description" caption="系统描述" />
      <DxColumn data-field="isSeparated" caption="独立" />
      <DxColumn data-field="separateSite" caption="独立站点" />
      <DxColumn data-field="enabled" data-type="boolean" caption="失效" />
    </DataGrid>
  </Card>
</template>

<script>
  import { DataGrid } from '/@/components/DxDataGrid';
  import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
  import { DxColumn } from 'devextreme-vue/data-grid';
  import { defineComponent } from 'vue';
  import Ez from '/@/utils/devexpress';
  export default defineComponent({
    name: 'Application',
    components: {
      DataGrid,
      DxColumn,
    },
    setup() {
      console.log(Ez.GetToken());
      let $url = 'https://localhost:44326';
      const url = `${$url}/api/application`;
      const dataSource = CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        // loadParams: params,
        insertUrl: `${url}/createdev`,
        updateUrl: `${url}/updatedev`,
        updateMethod: 'POST',
        deleteUrl: `${url}/delete`,
        deleteMethod: 'POST',
        // onBeforeSend: (method, ajaxOptions) => {
        //   ajaxOptions.headers = {
        //     Authorization: 'Bearer ' + Ez.GetToken(),
        //   };
        //   ajaxOptions.xhrFields = { withCredentials: false };
        // },
      });

      return {
        dataSource,
      };
    },
  });
</script>
