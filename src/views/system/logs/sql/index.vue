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
    <DxEditing
      mode="popup"
      :allow-adding="true"
      :allow-deleting="true"
      :allow-updating="true"
      :start-edit-action="'dbClick'"
      :select-text-on-edit-start="true"
    >
      <DxPopup :show-title="true" :width="800" :height="475" title="其他信息" />
      <DxForm>
        <DxItem :col-count="2" :col-span="2" item-type="group">
          <DxItem
            :col-span="2"
            data-field="sql"
            editor-type="dxTextArea"
            :editor-options="{ height: 180 }"
          />
          <DxItem
            :col-span="2"
            data-field="sqlParams"
            editor-type="dxTextArea"
            :editor-options="{ height: 180 }"
          />
        </DxItem>
      </DxForm>
    </DxEditing>

    <DxColumn data-field="stackId" caption="追踪id" />
    <DxColumn data-field="curdType" caption="Curd类型" />
    <DxColumn data-field="tableName" caption="操作表" />
    <DxColumn data-field="entityType" caption="实体类" />
    <DxColumn data-field="sql" caption="sql语句" />
    <DxColumn data-field="sqlParams" caption="sql参数" />
    <DxColumn data-field="elapsedMilliseconds" caption="执行时间" />
    <DxColumn data-field="success" caption="是否执行成功" />
    <DxColumn data-field="executeResult" caption="执行结果" />
    <DxColumn data-field="sqlException" caption="异常信息" />
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager,
  DxPopup,
  DxEditing,
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
    DxPopup,
    DxEditing,
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
      const url = `/api/log/sql`;
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        updateUrl: `${url}/update-dev`,
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
