<template>
  <DataGrid
    :data-source="dataSource"
    ref="tenantDataGrid"
    :height="dgHeight"
    @toolbar-preparing="onToolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxColumn data-field="code" caption="租户名" />
    <DxColumn data-field="name" caption="启用有效期" />
    <DxColumn data-field="enName" caption="有效期" />
    <DxColumn data-field="description" caption="系统别名" />
    <DxColumn data-field="isSeparated" data-type="boolean" caption="自定义系统地址" />
    <DxColumn data-field="enabled" data-type="boolean" caption="启用" />
  </DataGrid>
</template>

<script>
import {
  DxColumn,
  DxLookup,
  DxEditing,
  DxForm,
} from 'devextreme-vue/data-grid';
import { DataGrid } from "/@/components/DxDataGrid"
import { DxItem } from 'devextreme-vue/form';
import { ref, defineComponent, watchEffect } from 'vue';
// import { defHttp } from '/@/utils/http/axios';
import { Ez } from '/@/utils/devexpress';

export default defineComponent({
  name: 'TenantList',
  components: {
    DataGrid,
    DxColumn,
    DxLookup,
    DxEditing,
    DxForm,
    DxItem,
  },
  props: {
    tenantId: {
      default: '',
      type: String
    }
  },
  setup(props) {
    const dataGrid = ref(null);
    const dataSource = ref(null);
    const dgHeight = ref(0);
    const selData = ref({});

    watchEffect(() => {
      const url = `/api/application`;
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        loadParams: { tenantId: props.tenantId },
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
      });
    })
    function onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 86,
            type: 'normal',
            icon: 'refresh',
            text: '刷新',
            onClick: () => {
              dataGrid.value.instance.refresh();
            },
          },
        },
      );
    }
    function onContentReady() {
      document.querySelector(
        '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
      ).innerHTML = '操作';
    }
    function onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
      selData.value = selectedRowsData[0];
    }
    return {
      dataGrid,
      dataSource,
      dgHeight,
      pageNum: 20,
      pageSizes: [5, 10, 20, 50, 100],
      onContentReady,
      onToolbarPreparing,
      onSelectionChanged,
    };
  },
});
</script>


