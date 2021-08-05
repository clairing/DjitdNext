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
        <DxPopup :show-title="true" :width="800" :height="475" :title="'用户信息'" />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="account" />
            <DxItem data-field="name" />
            <DxItem data-field="phoneNum" />
            <DxItem data-field="phoneNumVerified" />
            <DxItem data-field="email" />
            <DxItem data-field="emailVerified" />
            <DxItem data-field="userType" />
            <DxItem data-field="password" />
            <DxItem data-field="expiryDate" />
            <DxItem data-field="expiryDateEnabled" />
            <DxItem data-field="passwordExpiryDate" />
            <DxItem data-field="passwordExpiryDateEnabled" />
            <DxItem data-field="enabled" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn data-field="account" caption="用户名" />
      <DxColumn data-field="name" caption="姓名" />
      <DxColumn data-field="phoneNum" caption="电话号码" cell-template="phoneTemplate" />
      <DxColumn data-field="email" caption="邮箱" cell-template="emailTemplate" />
      <DxColumn data-field="userType" caption="用户类型">
        <DxLookup :data-source="user_types" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn
        data-field="expiryDate"
        caption="用户有效期"
        cell-template="expiryDateTemplate"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      />

      <DxColumn
        data-field="passwordExpiryDate"
        caption="密码有效期"
        cell-template="expiryDateTemplate"
        data-type="date"
        format="yyyy-MM-dd HH:mm:ss"
      />

      <DxColumn data-field="enabled" caption="是否启用" data-type="boolean" />
      <DxColumn
        data-field="phoneNumVerified"
        caption="手机号是否验证"
        data-type="boolean"
        :visible="false"
      />
      <DxColumn
        data-field="emailVerified"
        caption="邮箱是否验证"
        data-type="boolean"
        :visible="false"
      />
      <DxColumn
        data-field="expiryDateEnabled"
        caption="是否启用用户有效期"
        data-type="boolean"
        :visible="false"
      />
      <DxColumn
        data-field="passwordExpiryDateEnabled"
        caption="是否启用密码有效期"
        data-type="boolean"
        :visible="false"
      />
      <DxColumn data-field="password" caption="密码" :visible="false" />

      <template #phoneTemplate="{ data }">
        <div>
          {{ formatGuid(data.text)
          }}<span v-if="formatGuid(data.text)">{{
            data.data.emailVerified ? '[已验证]' : '[未验证]'
          }}</span>
        </div>
      </template>
      <template #emailTemplate="{ data }">
        <div>
          {{ formatGuid(data.text)
          }}<span v-if="formatGuid(data.text)">{{
            data.data.emailVerified ? '[已验证]' : '[未验证]'
          }}</span>
        </div>
      </template>
      <template #expiryDateTemplate="{ data }">
        <div>
          {{ data.text }}<span>{{ data.data.expiryDateEnabled ? '[已启用]' : '[未启用]' }}</span>
        </div>
      </template>
      <template #passwordDateTemplate="{ data }">
        <div>
          {{ data.text
          }}<span>{{ data.data.passwordExpiryDateEnabled ? '[已启用]' : '[未启用]' }}</span>
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
    },
    setup() {
      const user_types = [
        { value: '1', text: '超级管理员' },
        { value: '2', text: '管理员' },
        { value: '3', text: '普通用户' },
      ];
      const http = 'https://localhost:44326';
      const url = `${http}/api/tenantuser`;
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
      function formatGuid(value) {
        const reg = new RegExp(
          /^[0-9a-zA-Z]{8}[0-9a-zA-Z]{4}[0-9a-zA-Z]{4}[0-9a-zA-Z]{4}[0-9a-zA-Z]{12}$/
        );
        if (reg.test(value)) {
          return null;
        } else {
          return value;
        }
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

        formatGuid,
        onContentReady,
      };
    },
  });
</script>
