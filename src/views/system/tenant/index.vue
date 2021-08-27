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
      showScrollbar: 'auto',
      useNative: false,
    }"
    :allow-column-reordering="true"
    :allow-column-resizing="true"
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
    <DxColumnChooser :enabled="true" />
    <DxExport :enabled="true" :allow-export-selected-data="true" />
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
      <DxPopup :show-title="true" :width="800" :height="675" title="租户信息" />
      <DxForm>
        <DxItem :col-count="2" :col-span="2" item-type="group">
          <DxItem data-field="tenantAid" />
          <DxItem data-field="tenantType" />
          <DxItem data-field="code" />
          <DxItem data-field="name" />
          <DxItem data-field="superUserName" />
          <DxSimpleItem>
            <template #default>
              <div class="dx-field">
                <div class="dx-field-label" style="width: auto;">选择用户</div>
                <div class="dx-field-value" style="width: 81%;">
                  <DxSelectBox value="John Smith" />
                </div>
              </div>
            </template>
          </DxSimpleItem>

          <DxItem data-field="expiryDate" />
          <DxItem data-field="expiryDateEnabled" />
          <DxItem data-field="enabled" />
          <DxItem data-field="levelScore" />
          <DxItem data-field="remark" editor-type="dxTextArea" />
          <DxItem data-field="enabled" />
        </DxItem>
        <DxItem :col-count="1" :col-span="2" item-type="group">
          <DxSimpleItem>
            <template #default>
              <div class="line"></div>
            </template>
          </DxSimpleItem>
        </DxItem>
        <DxItem :col-count="2" :col-span="2" item-type="group">
          <DxItem data-field="logoUrl" />
          <DxItem data-field="enabledCustomLogo" />
        </DxItem>
        <DxItem :col-count="1" :col-span="2" item-type="group">
          <DxSimpleItem>
            <template #default>
              <div class="line"></div>
            </template>
          </DxSimpleItem>
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
    <!-- <DxColumn type="buttons" :width="110">
      <DxButton name="edit" />
      <DxButton name="delete" />
      <DxButton hint="Clone" icon="repeat" />
    </DxColumn>-->
    <DxColumn data-field="name" caption="租户名称" width="200" />
    <DxColumn data-field="tenantAid" caption="识别码" width="150" />
    <DxColumn data-field="tenantType" caption="类型" width="120">
      <DxLookup :data-source="tenant_types" value-expr="value" display-expr="text" />
    </DxColumn>
    <DxColumn data-field="code" caption="编码" width="120" />
    <DxColumn data-field="superUserId" caption="超级管理员id" />
    <DxColumn data-field="superUserName" caption="超级管理员" />
    <DxColumn data-field="expiryDate" caption="有效期" data-type="date" format="yyyy-MM-dd HH:mm:ss" />
    <DxColumn data-field="enabled" caption="上线" data-type="boolean" />
    <DxColumn data-field="connectionString" caption="数据库连接字符串" />
    <DxColumn data-field="levelScore" caption="积分" />
    <DxColumn data-field="remark" caption="备注" />
    <DxColumn data-field="expiryDateEnabled" caption="启用有效期" :visible="false" data-type="boolean" />
    <DxColumn data-field="logoUrl" caption="Logo地址" :visible="false" />
    <DxColumn data-field="enabledCustomLogo" caption="启用logo" :visible="false" data-type="boolean" />
    <DxColumn data-field="cbyTime" caption="创建时间" :visible="false" data-type="date" />
    <template #toolBar>
      <div>
        <DxSelectBox
          display-expr="text"
          value-expr="value"
          :data-source="tenant_types"
          v-model:value="loadParams.tenantType"
        />
        <DxTextBox
          :show-clear-button="true"
          placeholder="租户 编码|名称"
          mode="search"
          value-change-event="blur"
          v-model:value="loadParams.searchValue"
          @value-changed="valueChanged"
        />
        <!-- <Button text="搜索" @click="handelQuery()" icon="search" /> -->
        <Button text="即将过期用户" @click="handelQuery()" />
        <Button text="提醒" @click="handelQuery()" />
        <Button text="变更积分" @click="handelQuery()" />
        <Button text="变更管理员" @click="handelQuery()" />
        <DxDropDownButton
          :items="buttonsGroup"
          :drop-down-options="{ width: 130 }"
          text="更多操作"
          icon="bulletlist"
          display-expr="text"
          key-expr="value"
          @item-click="onMoreOperateClick"
        />
      </div>
    </template>
  </DxDataGrid>
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
  DxColumnChooser,
  DxForm,
  DxExport
} from 'devextreme-vue/data-grid';
import { DxItem, DxSimpleItem } from 'devextreme-vue/form';
import DxTextBox from 'devextreme-vue/text-box';
import DxSelectBox from 'devextreme-vue/select-box';
import DxDropDownButton from 'devextreme-vue/drop-down-button';

import { onMounted, ref, defineComponent, reactive, watchEffect } from 'vue';
import { DxTextArea } from 'devextreme-vue/text-area';
import { defHttp } from '/@/utils/http/axios';
import { Ez } from '/@/utils/devexpress';
import { Button } from "/@/components/DxButton"

export default defineComponent({
  name: 'Application',
  components: {
    DxDropDownButton,
    DxSelectBox,
    DxTextBox,
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
    DxColumnChooser,
    DxExport,
    DxSimpleItem,
    Button
  },
  setup() {
    const tenant_types = [
      { value: 1, text: '系统' },
      { value: 3, text: '正式' },
      { value: 2, text: '测试' },
      { value: 4, text: '体验' },
      { value: 0, text: '全部' }
    ],
      buttonsGroup = [{ value: "auth", text: "系统授权" }, { value: "updatePwd", text: "更改管理员密码" }],
      dataGrid = ref(null),
      dataSource = ref(null),
      dgHeight = ref(0),
      selData = ref({}),

      loadParams = reactive({
        tenantType: 0,
        searchValue: ''
      });

    watchEffect(() => {
      const url = `/api/tenant`;
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        loadParams: { ...loadParams },
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
      });
    })

    function onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
        {
          location: "before",
          template: "toolBar"
        },
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
            text: '重新设置数据库连接',
            onClick: () => {
              if (!selData.value?.id) {
                
                // Ez.Notify('请先选中一条数据后再操作！');
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
    function handelQuery(data) {
      console.log(data);
    }
    function onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
      selData.value = selectedRowsData[0];
    }
    // 更多操作
    function onMoreOperateClick(e) {
      const eventValue = e.itemData.value;
      switch (eventValue) {
        case "updatePwd": //更新管理员密码

          break;
        case "auth": //授权系统

          break;
        default:
          break;
      }
    }
    onMounted(
      (window.onresize = function () {
        dgHeight.value = window.innerHeight - 150;
      })
    );
    return {
      buttonsGroup,
      dataGrid,
      dataSource,
      dgHeight,
      pageNum: 20,
      pageSizes: [5, 10, 20, 50, 100],
      tenant_types,
      loadParams,
      handelQuery,
      onContentReady,
      onToolbarPreparing,
      onSelectionChanged,
      onMoreOperateClick
    };
  },
});
</script>

<style scoped>
.dx-item .line {
  height: 1px;
  background: #ddd;
}
</style>
