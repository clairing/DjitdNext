<!--数据服务主项以及子项目-->
<template>
  <div>
    <DxDataGrid
      :data-source="dataSource"
      :height="600"
      width="100%"
      key-expr="drid"
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
      :scrolling="{ showScrollbar: 'always', useNative: false }"
      :column-resizing-mode="'widget'"
    >
      <DxPaging :page-size="10" />
      <DxFilterRow :visible="true" />
      <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />

      <DxEditing mode="popup" :allow-adding="true" :allow-deleting="true" :allow-updating="true">
        <DxPopup :show-title="true" :width="600" :height="475" :title="'数据服务编辑'" />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="dw_code" />
            <DxItem data-field="dw_name" />
            <DxItem data-field="api_url" :visible="ds_type === '请求'" />
            <DxItem
              data-field="description"
              editor-type="dxTextArea"
              :editor-options="{ height: 100 }"
            />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn data-field="dw_code" caption="服务编码" :width="160" />
      <DxColumn data-field="dw_name" caption="服务名" />
      <DxColumn data-field="status" caption="状态" cell-template="statusTemplate" :width="160" />
      <DxColumn data-field="api_url" caption="API地址" :visible="ds_type === '请求'" />
      <DxColumn data-field="description" caption="描述" width="20%" />
      <template #statusTemplate="{ data }">
        <DxSwitch
          v-model:value="data.value"
          switched-off-text="停用"
          switched-on-text="启用"
          :width="80"
          @value-changed="handelSwitchChange(data.key, data.value)"
        />
      </template>
      <template #tooolBarTemplate>
        <div class="informer">
          <span class="name">数据服务子项{{ typeText ? '-' + typeText + '服务' : '' }}</span>
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
  import DxSwitch from 'devextreme-vue/switch';
  import {
    DxDataGrid,
    DxColumn,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxEditing,
    DxPopup,
    DxForm,
  } from 'devextreme-vue/data-grid';
  import { DxTextArea } from 'devextreme-vue/text-area';
  import { DxItem } from 'devextreme-vue/form';
  import { createStore } from 'devextreme-aspnet-data-nojquery';
  import { computed, reactive, ref, watch, getCurrentInstance } from 'vue';
  import notify from 'devextreme/ui/notify';
  import { subOperate } from '@/api/service';

  const types = [
    { value: '同步', text: '同步' },
    { value: '请求', text: '请求' },
  ];

  export default {
    props: {
      ds_type: {
        type: String,
        default: '',
      },
      dsid: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const dataGrid = ref();
      const params = reactive({ dsCode: '' });
      const logvisible = ref(true);
      const typeText = computed(() => {
        return types.filter((item) => item.value == props.ds_type)[0]?.text ?? '';
      });
      const dataSource = ref(null);
      const internalInstance = getCurrentInstance();
      let $url = internalInstance.appContext.config.globalProperties.$appInfo.apiUrl;
      const url = `${$url}/api/sublistservice`;
      watch(
        () => props.dsid,
        (newVal, oldVal) => {
          params.dsCode = newVal || oldVal;
          loadDataSource();
        }
      );
      function loadDataSource() {
        dataSource.value = createStore({
          key: 'dwid',
          loadUrl: `${url}/get`,
          loadParams: params,
          insertUrl: `${url}/post`,
          insertParams: params,
          updateUrl: `${url}/put`,
          deleteUrl: `${url}/delete`,
          onBeforeSend: (method, ajaxOptions) => {
            ajaxOptions.xhrFields = { withCredentials: false };
          },
          onInserting(res) {
            res.ds_code = props.dsid; // 新增之前,添加关联主键
          },
        });
      }

      function handelSwitchChange(key, value) {
        var formData = { type: value ? 'start' : 'stop', id: key };
        subOperate(formData)
          .then((res) => {
            notify(
              {
                message: res.message,
                position: {
                  my: 'center center',
                  at: 'center center',
                },
                width: 200,
              },
              'success',
              2000
            );
            dataGrid.value.instance.refresh();
            dataGrid.value.instance.clearSelection();
          })
          .catch((error) => {
            notify(
              {
                message: error.message,
                position: {
                  my: 'center center',
                  at: 'center center',
                },
                width: 200,
              },
              'error',
              2000
            );
            dataGrid.value.instance.clearSelection();
          });
      }
      //显示日志信息
      function showLogData(key) {
        logvisible.value = true;
        console.log(key);
      }

      function onToolbarPreparing(e) {
        e.toolbarOptions.items.unshift({
          location: 'before',
          template: 'tooolBarTemplate',
        });
      }
      function onContentReady() {
        // document.querySelector(".dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit").innerText = "操作"
        // document.querySelector(".dx-freespace-row").style.height = 0
      }
      return {
        dataGrid,
        dataSource,
        logvisible,
        types,
        typeText,
        pageSizes: [5, 10, 20],
        showLogData,

        handelSwitchChange,
        onToolbarPreparing,
        onContentReady,
      };
    },
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
      // eslint-disable-next-line vue/no-unused-components
      DxTextArea,
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
