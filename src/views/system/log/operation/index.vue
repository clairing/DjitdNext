<template>
  <Card title="操作日志">
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
      <DxColumn data-field="success" caption="操作成功" data-type="boolean" />
      <DxColumn data-field="message" caption="具体消息" />
      <DxColumn data-field="ip" caption="IP" />
      <DxColumn data-field="location" caption="地址" />
      <DxColumn data-field="browser" caption="浏览器" />
      <DxColumn data-field="os" caption="操作系统" />
      <DxColumn data-field="url" caption="请求地址" />
      <DxColumn data-field="className" caption="类名称" />
      <DxColumn data-field="methodName" caption="方法名称" />
      <DxColumn data-field="reqMethod" caption="请求方式" />
      <DxColumn data-field="params" caption="请求参数" />
      <DxColumn data-field="result" caption="返回结果" />
      <DxColumn data-field="elapsedTime" caption="耗时" />
      <DxColumn data-field="opTime" caption="操作时间" />
    </DxDataGrid>
  </Card>
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
  import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
  import { DxTextArea } from 'devextreme-vue/text-area';
  import { defHttp } from '/@/utils/http/axios';

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
        const http = 'https://localhost:44326';
        const url = `${http}/api/log/operation`;
        dataSource.value = CreateStore({
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
                defHttp.post({ url: `/api/log/sql/clear` });
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
