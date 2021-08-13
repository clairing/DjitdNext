<template>
  <Card title="页面管理">
    <DxDataGrid
      :data-source="dataSource"
      ref="dataGrid"
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
        showScrollbar: 'always',
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
      <DxPaging :page-size="pageNum" />
      <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
      <DxFilterRow :visible="true" />
      <DxEditing
        mode="popup"
        :allow-adding="true"
        :allow-deleting="true"
        :allow-updating="true"
        :start-edit-action="'dbClick'"
        :select-text-on-edit-start="true"
      >
        <DxPopup :show-title="true" :width="800" :height="475" title="页面管理" />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="name" />
            <DxItem data-field="code" />
            <DxItem data-field="icon" />
            <DxItem data-field="router" />
            <DxItem data-field="component" />
            <DxItem data-field="permission" />
            <DxItem data-field="openType" />
            <DxItem data-field="link" />
            <DxItem data-field="redirect" />
            <DxItem data-field="helpUrl" />
            <DxItem data-field="sortNum" />
            <DxItem data-field="enabled" />
          </DxItem>
        </DxForm>
      </DxEditing>

      <DxColumn data-field="name" caption="名称" />
      <DxColumn data-field="code" caption="编码" />
      <DxColumn data-field="icon" caption="图标" />
      <DxColumn data-field="router" caption="路由地址" />
      <DxColumn data-field="component" caption="组件地址" />
      <DxColumn data-field="permission" caption="权限标识" />
      <DxColumn data-field="openType" caption="打开方式" />
      <DxColumn data-field="link" caption="内链地址" />
      <DxColumn data-field="redirect" caption="重定向地址" />
      <DxColumn data-field="helpUrl" caption="帮助页" />
      <DxColumn data-field="sortNum" caption="排序" />
      <DxColumn data-field="enabled" caption="启用" />

      <DxColumn
        data-field="expiryDateEnabled"
        caption="启用有效期"
        :visible="false"
        data-type="boolean"
      />
      <DxColumn data-field="cbyTime" caption="创建时间" :visible="false" data-type="date" />
      <template #expiryDateTemplate="{ data }">
        <div>
          {{ data.text }}
          <span>{{ data.data.expiryDateEnabled ? '[已启用]' : '[未启用]' }}</span>
        </div>
      </template>
    </DxDataGrid>
  </Card>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxLookup,
  DxPaging,
  DxPager,
  DxPopup,
  DxEditing,
  DxFilterRow,
  DxForm,
} from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';
import { onMounted, ref, defineComponent } from 'vue';
import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
import { DxTextArea } from 'devextreme-vue/text-area';
// import { defHttp } from '/@/utils/http/axios';
// import Ez from '/@/utils/devexpress';

export default defineComponent({
  name: 'Application',
  components: {
    DxDataGrid,
    DxColumn,
    DxLookup,
    DxPaging,
    DxPager,
    DxPopup,
    DxEditing,
    DxFilterRow,
    DxForm,
    DxItem,
    DxTextArea,
  },
  setup() {
    const user_types = [
      { value: '1', text: '超级管理员' },
      { value: '2', text: '管理员' },
      { value: '3', text: '普通用户' },
    ];
    const dataGrid = ref(null);
    const dataSource = ref(null);
    const dgHeight = ref(0);
    const selData = ref({});
    loadDataSource();
    function loadDataSource() {
      const http = 'https://localhost:44326';
      const url = `${http}/api/page`;
      dataSource.value = CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
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
            text: '设置',
            onClick: () => {
              // if (!selData.value?.id) {
              //   Ez.Notify('请先选中一条数据后再操作！');
              // } else {
              //   defHttp.post({ url: `/api/tenant/reset-connection-string/${selData.value.id}` });
              // }
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
    function onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
      selData.value = selectedRowsData[0];
    }
    onMounted(
      (window.onresize = function () {
        dgHeight.value = window.innerHeight - 180;
      })
    );
    return {
      dataGrid,
      dataSource,
      dgHeight,
      pageNum: 20,
      pageSizes: [5, 10, 20, 50, 100],
      user_types,
      onContentReady,
      onToolbarPreparing,
      onSelectionChanged,
    };
  },
});
</script>
