<template>
  <div>
    <DxDataGrid
      ref="dataGrid"
      :data-source="dataSource"
      :height="height"
      key-expr="tpid"
      :show-column-lines="true"
      :show-row-lines="true"
      :show-borders="true"
      :row-alternation-enabled="true"
      :focused-row-enabled="false"
      :column-auto-width="true"
      :column-hiding-enabled="false"
      :column-fixing="{ enabled: true }"
      :repaint-changes-only="true"
      @toolbar-preparing="onToolbarPreparing"
      @content-ready="onContentReady"
      @editor-preparing="oneditorPreparing"
      @row-dbl-click="onRowDblClick"
      :grouping="{ autoExpandAll: true }"
      :group-panel="{ visible: false }"
      :scrolling="{
        showScrollbar: 'always',
        useNative: false
      }"
      :column-resizing-mode="'widget'"
      :selection="{ mode: 'single' }"
      @selection-changed="onSelectionChanged"
    >
      <DxEditing
        mode="popup"
        :allow-adding="!seeDone"
        :allow-deleting="!seeDone"
        :allow-updating="true"
      >
        <DxPopup :show-title="true" :width="800" :height="625" :title="'调度任务信息'" />
        <DxForm>
          <DxItem data-field="job_name" />
          <DxItem data-field="src" />
          <!-- <DxItem :col-count="4" :col-span="2" item-type="group">

            <DxSimpleItem data-field="FirstName" />
            <DxSimpleItem data-field="BirthDate" editor-type="dxDateBox" />

          </DxItem>-->

          <DxItem data-field="job_desc" :editor-options="{ readOnly: false }" />
          <DxItem data-field="tenant" />
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem
              data-field="test"
              editorType="dxDateBox"
              :editor-options="{ displayFormat: 'yyyy-MM-dd' }"
              :value="'11'"
              @focusin="alert(1)"
            />
            <DxItem data-field="test1" editorType="dxDateBox" displayFormat="yyyy-MM-dd" />
          </DxItem>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="need_download" />
          </DxItem>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxSimpleItem>
              <template #default>
                <div class="line"></div>
              </template>
            </DxSimpleItem>
          </DxItem>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="need_callback" />
            <DxItem data-field="callback_path" />
            <DxItem data-field="callback_params" :col-span="2" />
          </DxItem>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxSimpleItem>
              <template #default>
                <div class="line"></div>
              </template>
            </DxSimpleItem>
          </DxItem>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="need_notice" />
            <DxItem data-field="notice_email" />
            <DxItem data-field="notice_phone" />
            <DxItem data-field="notice_siteemail" />
          </DxItem>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxSimpleItem>
              <template #default>
                <div class="line"></div>
              </template>
            </DxSimpleItem>
          </DxItem>
          <DxItem data-field="job_status" />
          <DxItem data-field="job_progress" />
          <DxItem data-field="creation_time" />
          <DxItem data-field="start_time" />
          <DxItem data-field="end_time" />
        </DxForm>
      </DxEditing>

      <DxPaging :page-size="2" />
      <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
      <!-- <DxColumn data-field="job_name" caption="任务类型" :allow-filtering='false' /> -->
      <DxColumn data-field="tenant" caption="租户" :visible="true" />
      <DxColumn
        data-field="creation_time"
        caption="任务下派时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn data-field="job_name" caption="任务名" :allow-filtering="false" width="180" />
      <DxColumn data-field="job_desc" caption="任务描述" width="270" />
      <DxColumn data-field="job_progress" caption="进度" width="70" />
      <DxColumn
        data-field="job_status"
        :width="120"
        caption="状态"
        :allow-editing="false"
        :allow-filtering="!seeDone"
      >
        <DxLookup
          value-expr="value"
          display-expr="text"
          :data-source="!seeDone ? status : status1"
        />
      </DxColumn>
      <DxColumn
        data-field="start_time"
        caption="任务开始时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn
        data-field="end_time"
        caption="任务完成时间"
        data-type="date"
        :allow-editing="false"
        :width="120"
        format="yyyy-MM-dd HH:mm:ss"
      />
      <DxColumn
        data-field="need_download"
        caption="下载"
        data-type="boolean"
        width="100"
        header-cell-template="headerCellTemplate"
      />
      <DxColumn
        data-field="need_callback"
        caption="回执"
        width="100"
        data-type="boolean"
        header-cell-template="headerCellTemplate"
      />
      <DxColumn
        data-field="need_notice"
        caption="通知"
        width="100"
        data-type="boolean"
        header-cell-template="headerCellTemplate"
      />
      <DxColumn data-field="download_path" caption="下载地址" :visible="false" />
      <DxColumn data-field="callback_path" caption="回执地址" :visible="false" />
      <DxColumn data-field="callback_params" caption="回执参数" :visible="false" />
      <DxColumn data-field="notice_siteemail" caption="站内信" :visible="false" />
      <DxColumn data-field="notice_email" caption="邮件" :visible="false" />
      <DxColumn data-field="notice_phone" caption="短信" :visible="false" />
      <DxColumn data-field="src" caption="来源" :width="180" />
      <DxColumn
        data-field
        caption="执行记录"
        :allow-filtering="false"
        cell-template="logTemplate"
        width="80"
        fixed="true"
        fixed-Position="right"
      />
      <DxColumn
        data-field
        caption="查看结果"
        :allow-filtering="false"
        cell-template="downloadResultTemplate"
        width="80"
        fixed="true"
        fixed-Position="right"
      />
      <DxFilterRow :visible="true" />
      <!-- 查看结果 -->
      <!-- 当需要下载的时候，才可以查看 -->
      <template #downloadResultTemplate="{ data }">
        <div
          class="text-center task-a"
          @click="toggleDownloadResult(data.data.download_path)"
          v-if="data.data.need_download"
        >查看</div>
      </template>
      <!-- 查询日志 -->
      <template #logTemplate="{ data }">
        <div class="text-center task-a" @click="toggleTaskDetailVisble(data.key, data.value)">查看</div>
      </template>
      <!-- 状态结果 -->
      <!-- <template #statusTemplate="{ data }">
        <div class="text-center task-a" :id="'tmp' + data.key" @click="handelStatus(data.key, data.value)">
          {{ data.text }}</div>
      </template>-->
      <!-- 头部标题模板 -->
      <template #headerCellTemplate="{ data }">
        <div
          class="text-center"
          :title="
            data.column.name == 'need_download'
              ? '是否需要下载'
              : data.column.name == 'need_callback'
                ? '是否需要回执'
                : '是否需要通知'
          "
        >
          {{
            data.column.name == 'need_download'
              ? '下载'
              : data.column.name == 'need_callback'
                ? '回执'
                : '通知'
          }}
        </div>
      </template>
      <template #tooolBarCheckBox>
        <DxCheckBox v-model:value="seeDone" :width="120" text="查看已完成" />
      </template>
    </DxDataGrid>
    <!-- 必须用v-model:visbel,否则点击多次 -->
    <Popup
      :width="800"
      :height="400"
      :show-title="true"
      :close-on-outside-click="true"
      v-model:visible="taskDetailVisible"
      position="center"
      title="日志记录"
    >
      <LogDetail :paramaid="tpid" type="dispatch" />
    </Popup>
    <Popup
      :width="400"
      :height="200"
      :show-title="true"
      v-model:visible="taskDownLoadVisible"
      :close-on-outside-click="true"
      position="center"
      title="下载结果"
    >{{ downloadPath }}</Popup>
  </div>
</template>
{{ statusValue }}
<script>
import {
  DxDataGrid,
  DxColumn,
  DxLookup,
  DxPopup,
  DxPaging,
  DxPager,
  DxEditing,
  DxForm,
  DxFilterRow,
} from 'devextreme-vue/data-grid'
import { DxCheckBox } from 'devextreme-vue/check-box'
import DxDateBox from 'devextreme-vue/date-box';
import { DxItem, DxSimpleItem } from 'devextreme-vue/form'
import { DxPopup as Popup } from 'devextreme-vue/popup'
import { ref, computed, onMounted, reactive, watch } from 'vue'
import LogDetail from '../../components/LogDetail.vue'
import notify from 'devextreme/ui/notify'
import { createStore } from "devextreme-aspnet-data-nojquery"
import { getCurrentInstance } from 'vue'
// 接口
import { updatetaskstatus } from '/@/api/task'

export default {
  components: {
    DxDataGrid,
    DxPopup,
    DxEditing,
    DxColumn,
    DxLookup,
    DxPaging,
    DxPager,
    DxItem,
    DxSimpleItem,
    DxForm,
    // eslint-disable-next-line vue/no-unused-components
    DxDateBox,
    DxCheckBox,
    Popup,
    DxFilterRow,
    LogDetail,
  },
  setup() {
    const dataGrid = ref() // dataGrid 实例
    const height = ref(0) // dataGrid 高度
    const seeDone = ref(false)// 查看已完成
    const status = [
      { value: 'waiting', text: '等待处理', editable: false },
      { value: 'progressing', text: '处理中', editable: true },
      { value: 'suspend', text: '暂停', editable: true },
      { value: 'abnormal', text: '异常', editable: false },
    ];
    const status1 = [{ value: 'end', text: '任务完成', editable: false }];
    const taskDetailVisible = ref(false);
    const taskDownLoadVisible = ref(false);
    const downloadPath = ref('');
    let params = reactive({ tenant: "", bdate: '', edate: '', status: '' });
    const tpid = ref("");
    const type = ref('');
    const statusId = ref(1);
    const popoverVisible = ref(false);
    const statusValue = ref('');
    let selData = ref({})
    const { proxy } = getCurrentInstance()
    let $url = proxy.$appInfo.apiUrl
    const url = `${$url}/api/activetask`;
    const dataSource = ref(null)
    LoadDataSource()
    function onRowDblClick(e) {
      e.component.editRow(e.component.getRowIndexByKey(e.key));
    }
    function LoadDataSource() {
      if (!seeDone.value) {
        dataSource.value = createStore({
          key: "tpid",
          loadUrl: `${url}/get`,
          loadParams: params,
          insertUrl: `${url}/post`,
          updateUrl: `${url}/put`,
          deleteUrl: `${url}/delete`,
          onBeforeSend: (method, ajaxOptions) => {
            ajaxOptions.xhrFields = { withCredentials: false }
          }
          , onLoading: (res) => {
            console.log(res)
            return ""
          }
        })
      } else {
        dataSource.value = createStore({
          key: "tpid",
          loadUrl: `${url}/getdone`,
          loadParams: params,
        })
      }
    }


    const statusText = computed(() => {
      return status.filter((item) => item.editable).map((item) => item.value);
    });
    // 查询
    watch(seeDone, () => {
      LoadDataSource()
    })
    // watch(() => seeDone, (newVal) => {
    //   console.log(newVal);
    //   if (newVal) {
    //     dataGrid.value.instance.refresh();
    //   }
    // })
    // 头部工具栏
    function onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
        {
          location: 'before',
          template: 'tooolBarCheckBox',
        },
        {
          location: 'before',
          widget: 'dxSelectBox',
          options: {
            width: 200,
            searchEnabled: true,
            // items: status,
            displayExpr: 'text',
            valueExpr: 'value',
            placeholder: '请选择租户',
            value: 'status',
            onValueChanged: function (data) {
              params.tenant = data.value;
              refreshDataGrid();
            },
          },
        },
        {
          location: 'before',
          widget: 'dxDateBox',
          options: {
            type: 'date',
            // value: new Date(),
            placeholder: '开始时间',
            displayFormat: 'yyyy-MM-dd',
            onValueChanged: function (data) {
              params.bdate = dateFormat(data.value);
            },
          },
        },
        {
          location: 'before',
          widget: 'dxDateBox',
          options: {
            type: 'date',
            // value: new Date(),
            placeholder: '结束时间',
            displayFormat: 'yyyy-MM-dd',
            onValueChanged: function (data) {
              params.edate = dateFormat(data.value);
            },
          },
        },
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 86,
            type: 'default',
            icon: 'search',
            text: '查询',
            onClick: () => {
              refreshDataGrid();
              console.log(params);
            },
          },
        },
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 86,
            type: 'default',
            icon: 'link',
            visible: !seeDone.value,
            text: '处理中',
            onClick: () => {
              handelStatus("progressing")
            },
          }
        },
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 86,
            type: 'danger',
            icon: 'video',
            visible: !seeDone.value,
            text: '暂停',
            onClick: () => {
              handelStatus("suspend")
            },
          }
        }
      );
    }
    onMounted(
      window.onresize = () => {
        height.value = window.innerHeight - 150
      })

    function dateFormat(date) {
      return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      );
    }
    // 根据下拉选择刷新dataGrid
    function refreshDataGrid() {
      // dataSource.value = []
      dataGrid.value.instance.refresh();
    }
    // function radioTemplate(itemData, _, itemElement) {
    //   itemElement.innerText = status.filter(
    //     (item) => item.value == itemData
    //   )[0].text;
    // }
    function toggleTaskDetailVisble(key, value) {
      tpid.value = key;
      type.value = value;
      console.log(value);
      taskDetailVisible.value = !taskDetailVisible.value;
    }
    // 切换展示下载结果并赋值
    function toggleDownloadResult(data) {
      taskDownLoadVisible.value = true
      downloadPath.value = data
    }
    // 切换处理状态
    function handelStatus(type) {
      console.log(selData);
      let fn = updatetaskstatus
      if (!selData.value?.tpid) {
        return notify({
          message: "请先选中后一条数据后再操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      if ((type === "progressing" && ["suspend", "waiting"].indexOf(selData.value.job_status) < 0)) {
        return notify({
          message: "非暂停和等待处理不可执行恢复操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      if (type === "suspend" && selData.value.job_status !== 'progressing') {
        return notify({
          message: "非处理中不可执行暂停操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      var formData = new FormData()
      formData.append("key", selData.value.tpid)
      formData.append("values", type)
      fn(formData).then((res) => {
        notify({
          message: res.message,
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'success', 2000);
        dataGrid.value.instance.refresh()
        dataGrid.value.instance.clearSelection()
      }).catch(error => {
        notify({
          message: error.message,
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      })
    }


    function handelRadioChange(e) {
      console.log(e.value);
      popoverVisible.value = false;
    }
    function onContentReady() {
      document.querySelector(
        '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
      ).innerText = '操作';
      document.querySelector('.dx-freespace-row').style.height = 0;
    }

    function onSelectionChanged({ selectedRowsData }) {
      console.log(selectedRowsData);
      selData.value = selectedRowsData[0];
    }

    function showAlert(key) {
      console.log(key);
    }
    // 编辑的时候禁用字段
    function oneditorPreparing(e) {
      if (!e.row?.isNewRow) {
        var fieldName = (e.name || "-") + "|";
        if ("job_desc|".indexOf(fieldName) > -1) {
          // e.editorOptions.disabled = true
          e.editorElement.onClick = function () {
            // alert(1)
          }
          // e.addEventListener("focus",function())
          console.log(e);
        }
      }
    }
    return {
      employee: {
        firstName: "John",
        lastName: "Heart",
        position: "CEO",
        officeNo: 901
      },
      dataGrid,
      height,
      seeDone,
      dataSource,
      status,
      status1,
      tpid,
      type,
      statusId,
      pageSizes: [5, 10, 20],
      taskDetailVisible,
      popoverVisible,
      statusText,
      statusValue,
      selData,
      taskDownLoadVisible,
      downloadPath,

      toggleDownloadResult,
      refreshDataGrid,
      toggleTaskDetailVisble,
      onToolbarPreparing,
      handelStatus,
      handelRadioChange,
      onContentReady,
      onSelectionChanged,
      onRowDblClick,
      showAlert,
      oneditorPreparing
    };
  },

};
</script>

<style lang="scss" scoped>
.task-a {
  text-decoration: underline;
  cursor: pointer;
}

.dx-row-focused {
  .task-a {
    color: #fff;
  }
}

.dx-item .line {
  height: 1px;
  background: #ddd;
}

.dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
  width: 75%;
}

.text-center {
  min-width: 80px;
}
</style
>>
