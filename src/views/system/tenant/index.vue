<template>
  <Card title="系统管理">
    <DxDataGrid
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
        <DxPopup :show-title="true" :width="800" :height="475" title="租户信息" />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="tenantAid" />
            <DxItem data-field="tenantType" />
            <DxItem data-field="code" />
            <DxItem data-field="name" />
            <DxItem data-field="expiryDate" />
            <DxItem data-field="expiryDateEnabled" />
            <DxItem data-field="enabled" />
            <DxItem data-field="levelScore" />
          </DxItem>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem
              :col-span="2"
              data-field="connectionString"
              editor-type="dxTextArea"
              :editor-options="{ height: 100 }"
            />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn data-field="tenantAid" caption="识别码" />
      <DxColumn data-field="tenantType" caption="类型">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="code" caption="编码" />
      <DxColumn data-field="name" caption="租户名称" />
      <DxColumn data-field="superUserName" caption="超级管理员" cell-template="emailTemplate" />

      <DxColumn
        data-field="expiryDate"
        caption="有效期"
        cell-template="expiryDateTemplate"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      />

      <DxColumn data-field="enabled" caption="是否启用" data-type="boolean" />
      <DxColumn data-field="connectionString" caption="数据库连接字符串" />
      <DxColumn data-field="levelScore" caption="积分" />
      <DxColumn data-field="remark" caption="备注" />
      <DxColumn
        data-field="expiryDateEnabled"
        caption="启用有效期"
        :visible="false"
        data-type="boolean"
      />
      <DxColumn data-field="cbyTime" caption="创建时间" :visible="false" data-type="date" />
      <template #expiryDateTemplate="{ data }">
        <div>
          {{ data.text }}<span>{{ data.data.expiryDateEnabled ? '[已启用]' : '[未启用]' }}</span>
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
      const http = 'https://localhost:44326';
      const url = `${http}/api/tenant`;
      const dgHeight = ref(0);
      const dataSource = CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
      });
      function onContentReady() {
        // document.querySelector(
        //   '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
        // ).innerHTML = '操作';
      }
      onMounted(
        (window.onresize = function () {
          dgHeight.value = window.innerHeight - 180;
        })
      );
      return {
        dataSource,
        dgHeight,
        pageNum: 20,
        pageSizes: [5, 10, 20, 50, 100],
        user_types,
        onContentReady,
      };
    },
  });
</script>
