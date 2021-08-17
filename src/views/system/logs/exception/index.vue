<template>
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
    >
      <DxPaging :page-size="pageNum" />
      <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
      <DxFilterRow :visible="true" />
      <DxColumn data-field="name" caption="名称" />
      <DxColumn data-field="className" caption="类名" />
      <DxColumn data-field="methodName" caption="方法名" />
      <DxColumn data-field="exceptionMsg" caption="异常信息" />
      <DxColumn data-field="exceptionSource" caption="异常源" />
      <DxColumn data-field="stackTrace" caption="堆栈信息" />
      <DxColumn data-field="exceptionTime" caption="异常时间" />
      <DxColumn data-field="params" caption="参数" />
    </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxFilterRow,
  DxForm,
} from 'devextreme-vue/data-grid';
import { DxItem } from 'devextreme-vue/form';
import { onMounted, ref, defineComponent } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { defHttp } from '/@/utils/http/axios';
import { Ez } from "/@/utils/devexpress"

export default defineComponent({
  name: 'LogSql',
  components: {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxForm,
    DxItem,
    DxTextArea,
  },
  setup() {
    const dataGrid = ref(null);
    const dataSource = ref(null);
    const dgHeight = ref(0);
    loadDataSource();
    function loadDataSource() {
      const url = `/api/log/exception`;
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
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
            text: '清除该用户所有的日志',
            onClick: () => {
              defHttp.post({ url: `/api/log/exception/clear` });
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
      onContentReady,
      onToolbarPreparing,
    };
  },
});
</script>
