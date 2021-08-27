<template>
  <DxDataGrid
    ref="dataGrid"
    :data-source="dataSource"
    :height="dgHeight"
    :show-column-lines="true"
    :show-row-lines="true"
    :show-borders="true"
    :row-alternation-enabled="true"
    :focused-row-enabled="false"
    :column-auto-width="true"
    :column-hiding-enabled="false"
    :column-fixing="{ enabled: true }"
    :repaint-changes-only="true"
    :grouping="{ autoExpandAll: true }"
    :group-panel="{ visible: false }"
    :scrolling="{
      showScrollbar: 'auto',
      useNative: false,
    }"
    :column-resizing-mode="'widget'"
    :selection="{ mode: 'single' }"
    :remote-operations="{
      paging: true,
      filtering: true,
      sorting: true,
      grouping: true,
      summary: true,
      groupPaging: true,
    }"
    @content-ready="onContentReady"
    @toolbar-preparing="onToolbarPreparing"
    @selection-changed="onSelectionChanged"
  >
    <DxEditing mode="row" :allow-adding="true" :allow-deleting="true" :allow-updating="true" />
    <DxPaging :page-size="pageNum" />
    <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
    <DxFilterRow :visible="true" />
    <DxColumnChooser :enabled="true" />
    <DxExport :enabled="true" :allow-export-selected-data="true" />

    <DxColumn data-field="code" caption="系统编码" />
    <DxColumn data-field="name" caption="系统名称" />
    <DxColumn data-field="enName" caption="英文名称" />
    <DxColumn data-field="description" caption="系统描述" />
    <DxColumn data-field="isSeparated" data-type="boolean" caption="独立" />
    <DxColumn data-field="separateSite" caption="独立站点" />
    <DxColumn data-field="enabled" data-type="boolean" caption="启用" />
  </DxDataGrid>
  <a-alert v-if="selData.name" :message="'当前选中系统：' + selData.name" type="info" />
</template>

<script>
import {
  DxColumn,
  DxDataGrid,
  DxLookup,
  DxEditing,
  DxForm,
  DxPaging,
  DxPager,
  DxFilterRow,
  DxColumnChooser,
  DxExport
} from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';
import { ref, defineComponent, onMounted } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { Ez } from '/@/utils/devexpress';

export default defineComponent({
  name: 'Application',
  components: {
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxEditing,
    DxForm,
    DxItem,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser,
    DxExport
  },
  emits: { 'selectSys': {} },
  setup(props, { emit }) {
    const tenant_types = [
      { value: 1, text: '系统' },
      { value: 3, text: '正式' },
      { value: 2, text: '测试' },
      { value: 4, text: '体验' },
      { value: 0, text: '未知' },
    ];
    const dataGrid = ref(null);
    const dgHeight = ref(null);
    const dataSource = ref(null);
    const selData = ref({});
    loadDataSource();
    function loadDataSource() {
      const url = `/api/application`;
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
        onRemoved: function (key) {
          if (key == selData.value?.id) {
            selData.value = ref({});
          }
        }
      });
    }
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
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 150,
            type: 'default',
            icon: '',
            text: '复制',
            onClick: () => {
              if (!selData.value?.id) {
                Ez.Notify('请先选中一条数据后再操作！');
              } else {
                defHttp.post({ url: `/api/tenant/reset-connection-string/${selData.value.id}` });
              }
            },
          },
        }
      );
    }
    function onContentReady() {
      document.querySelector(
        '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
      ).innerHTML = '操作';
    }
    // 选中数据
    function onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
      selData.value = selectedRowsData[0];
      emit("selectSys", selData);
    }
    onMounted(
      (window.onresize = function () {
        dgHeight.value = window.innerHeight - 150;
      })
    );
    return {
      dataGrid,
      dgHeight,
      dataSource,
      pageNum: 20,
      pageSizes: [5, 10, 20, 50, 100],
      tenant_types,
      selData,
      onContentReady,
      onToolbarPreparing,
      onSelectionChanged,
    };
  },
});
</script>


