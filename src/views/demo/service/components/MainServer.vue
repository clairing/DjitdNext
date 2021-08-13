<!--数据服务主项以及子项目-->
<template>
  <div>
    <div>
      <DxDataGrid
        :data-source="dataSource"
        :height="height"
        width="100%"
        key-expr="dsid"
        ref="dataGrid"
        @toolbar-preparing="onToolbarPreparing($event)"
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
        @content-ready="onContentReady"
        :scrolling="{
          showScrollbar: 'always',
          useNative: false,
        }"
        :column-resizing-mode="'widget'"
      >
        <DxPaging :page-size="10" />
        <DxFilterRow :visible="true" />
        <DxPager
          :show-page-size-selector="true"
          :show-info="true"
          :allowed-page-sizes="pageSizes"
        />

        <DxEditing
          mode="popup"
          :allow-adding="canEditing"
          :allow-deleting="canEditing"
          :allow-updating="canEditing"
        >
          <DxPopup :show-title="true" :width="500" :height="475" :title="'数据服务编辑'" />
          <DxForm>
            <DxItem :col-count="1" :col-span="2" item-type="group">
              <DxItem data-field="ds_type" />
              <DxItem data-field="ds_code" />
              <DxItem data-field="ds_name" />
              <DxItem
                data-field="description"
                editor-type="dxTextArea"
                :editor-options="{ height: 100 }"
              />
            </DxItem>
          </DxForm>
        </DxEditing>
        <DxColumn data-field="ds_type" caption="类型" :width="120">
          <DxLookup value-expr="value" display-expr="text" :data-source="types" />
        </DxColumn>
        <DxColumn data-field="ds_code" caption="编码" :width="100" />
        <DxColumn data-field="ds_name" caption="服务名" :width="120" />
        <DxColumn data-field="status" caption="状态" cell-template="statusTemplate" :width="140" />
        <DxColumn data-field="description" caption="描述" />
        <DxColumn data-field caption="详情" width="120" cell-template="detailTemplate" />
        <!-- <DxColumn data-field caption=" 日志" width="120" cell-template="logTemplate" :visible="canEditing" /> -->
        <template #statusTemplate="{ data }">
          <DxSwitch
            v-model:value="data.value"
            switched-off-text="停用"
            switched-on-text="启用"
            width="80px"
            @value-changed="handelSwitchChange(data.key, data.value)"
            :disabled="!canEditing"
          />
        </template>

        <template #detailTemplate="{ data }">
          <a class="command-a" @click="showDetailData(data)">查看</a>
        </template>

        <!-- <template #logTemplate="{ data }">
          <a class="command-a" @click="showLogData(data.data)">查看</a>
        </template> -->

        <template #tooolBarTemplate>
          <div class="informer">
            <span class="name">数据服务主项</span>
          </div>
        </template>
      </DxDataGrid>
    </div>

    <Popup
      :width="900"
      :height="400"
      :show-title="true"
      :close-on-outside-click="true"
      v-model:visible="logVisible"
      position="center"
      title="日志记录"
    >
      <LogDetail :paramaid="paramaid" type="main" />
    </Popup>
  </div>
</template>

<script>
  import DxSwitch from 'devextreme-vue/switch';
  import { DxPopup as Popup } from 'devextreme-vue/popup';
  import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxEditing,
    DxPopup,
    DxLookup,
    DxForm,
  } from 'devextreme-vue/data-grid';
  import { DxTextArea } from 'devextreme-vue/text-area';
  import { DxItem } from 'devextreme-vue/form';
  import { ref, onMounted, watch, computed } from 'vue';
  import LogDetail from './LogDetail.vue';
  import { CreateStore } from '/@/utils/devextreme-aspnet-data-nojquery';
  import { useGlobSetting } from '/@/hooks/setting';
  const types = [
    { value: '同步', text: '同步' },
    { value: '请求', text: '请求' },
  ];
  export default {
    components: {
      DxSwitch,
      DxDataGrid,
      DxColumn,
      DxPaging,
      DxPager,
      DxFilterRow,
      DxEditing,
      DxPopup,
      DxForm,
      DxItem,
      DxLookup,
      Popup,
      // eslint-disable-next-line vue/no-unused-components
      DxTextArea,
      LogDetail,
    },
    props: {
      canEditing: {
        default: false,
        type: Boolean,
      },
      reload: {
        default: false,
        type: Boolean,
      },
    },

    setup(props, { emit }) {
      const dataGrid = ref(); //dataGrid 实例
      const logVisible = ref(false);
      const paramaid = ref('');
      const typeText = ref('');
      const { urlPrefix } = useGlobSetting;
      const url = `${urlPrefix}/api/masterservice`;
      const dataSource = ref(null);
      const height = ref(0);
      loadDataSource();
      function loadDataSource() {
        dataSource.value = CreateStore({
          key: 'dsid',
          loadUrl: `${url}/get`,
          insertUrl: `${url}/post`,
          updateUrl: `${url}/put`,
          deleteUrl: `${url}/delete`,
        });
      }
      onMounted(
        (window.onresize = function () {
          height.value = window.innerHeight - 150;
        })
      );
      console.log(props.reload);
      // 配置租户企业刷新数据
      watch(
        () => props.reload,
        (newVal) => {
          console.log(newVal);
          loadDataSource();
        }
      );
      const reload = computed(() => {
        return props.reload;
      });
      if (reload.value) {
        loadDataSource();
      }
      function handelSwitchChange(key, value) {
        var formData = { type: value ? 'start' : 'stop', id: key };
      }
      //显示日志信息
      function showLogData(data) {
        logVisible.value = true;
        paramaid.value = data.dm_code;
      }
      // 展示子服务
      function showDetailData(data) {
        emit('emitData', { ds_type: data.data.ds_type, chVisible: true, dsid: data.data.ds_code });
      }

      function onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift(
          {
            location: 'before',
            template: 'tooolBarTemplate',
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
                loadDataSource();
              },
            },
          }
        );
      }
      function onContentReady() {
        const el = document.querySelector(
          '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
        );
        if (el) el.innerText = '操作';
        document.querySelector('.dx-freespace-row').style.height = 0;
      }
      return {
        dataGrid,
        dataSource,
        logVisible,
        types,
        typeText,
        pageSizes: [5, 10, 20],
        height,
        paramaid,

        showLogData,
        showDetailData,
        handelSwitchChange,
        onToolbarPreparing,
        onContentReady,
      };
    },
  };
</script>

<style scoped>
  .informer .name {
    font-size: 15px;
    font-weight: bold;
    color: #01abef;
  }
</style>
