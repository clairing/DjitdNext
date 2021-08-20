<!-- 定时任务  -->
<template>
  <DxDataGrid
    :data-source="dataSource"
    ref="dataGrid"
    :height="height"
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
      paging: false,
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
    <!-- :repaint-changes-only="true" -->
    <DxFilterRow :visible="true" />
    <DxPaging :page-size="10" />
    <DxEditing
      mode="popup"
      :allow-adding="true"
      :allow-deleting="true"
      :allow-updating="true"
      :start-edit-action="'dbClick'"
      v-model:changes="changes"
      :select-text-on-edit-start="true"
    >
      <DxPopup :show-title="true" :width="800" :height="675" :title="'定时任务信息'" />
      <DxForm>
        <DxItem data-field="tenantId" :col-span="2" />
        <DxItem :col-count="1" :col-span="2" item-type="group">
          <DxItem data-field="jobName" />
          <DxItem data-field="jobGroup" />
        </DxItem>
        <DxItem :col-count="2" :col-span="2" item-type="group">
          <DxItem data-field="cron" />
          <DxSimpleItem>
            <template #default>
              <a
                href="http://www.html580.com/tool/quartz/index.html"
                target="_blank"
                style="vertical-align: -webkit-baseline-middle;"
              >参考地址</a>
            </template>
          </DxSimpleItem>
        </DxItem>

        <DxItem :col-count="2" :col-span="2" item-type="group">
          <DxItem data-field="doOnce" />
          <DxItem data-field="startNow" />
          <DxItem data-field="interval" />
          <DxItem data-field="executeType" />
          <DxItem data-field="timerType" />
          <DxItem data-field="requestType" />
          <DxItem data-field="requestUrl" />
          <DxItem data-field="requestParameters" />
          <DxItem data-field="enabled" />
        </DxItem>
        <DxItem :col-span="2" :col-count="2" data-field="description" />
      </DxForm>
    </DxEditing>

    <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />

    <DxColumn data-field="tenantId" caption="租户" />
    <DxColumn data-field="jobName" caption="作业名称" :width="150" />
    <DxColumn data-field="jobGroup" caption="作业组" />
    <DxColumn data-field="doOnce" caption="只执行一次" :width="100" />
    <DxColumn data-field="startNow" caption="立即执行" :width="100" />
    <DxColumn data-field="interval" caption="执行间隔时间" />
    <DxColumn data-field="cron" caption="Cron表达式" />
    <DxColumn data-field="executeType" caption="执行类型" />
    <DxColumn data-field="timerType" caption="定时器类型" />
    <DxColumn data-field="requestType" caption="请求类型" />
    <DxColumn data-field="requestUrl" caption="请求url" />
    <DxColumn data-field="requestParameters" caption="请求参数" />
    <DxColumn data-field="headers" caption="Headers" />
    <DxColumn data-field="description" caption="备注" />
    <DxColumn data-field="enabled" caption="启用" />
    <!-- <DxColumn data-field="execStatus" caption="Cron表达式" />
      <DxColumn data-field="runNumber" caption="Cron表达式" />
    <DxColumn data-field="exception" caption="Cron表达式" />-->
  </DxDataGrid>
  <!---日志记录-->
  <Popup
    :width="900"
    :height="400"
    :show-title="true"
    :close-on-outside-click="true"
    v-model:visible="taskDetailVisible"
    position="center"
    title="执行记录"
  />
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
} from 'devextreme-vue/data-grid'
import { DxItem, DxSimpleItem } from 'devextreme-vue/form'
import { DxPopup as Popup } from 'devextreme-vue/popup'
import { computed, reactive, ref, watch, onMounted } from 'vue'

import notify from 'devextreme/ui/notify';
import { startTimerJob, stopTimerJob } from '/@/api/demo/task'
import { Ez } from "/@/utils/devexpress"

export default {
  components: {
    DxDataGrid,
    DxPopup,
    DxItem,
    DxSimpleItem,
    DxColumn,
    DxLookup,
    DxPaging,
    DxPager,
    DxEditing,
    DxFilterRow,
    DxForm,
    Popup,
    // DxTextArea,
    // DPopup,
    // LogDetail
  },
  //  执行类型: [并行、列队]
  setup() {
    const statusArr = [{ value: "offline", text: "离线", editable: false }, { value: "normal", text: "正常", editable: true }, { value: "suspend", text: "暂停", editable: true }, { value: "abnormal", text: "异常", editable: false }]
    const task_ways = [{ value: "local", text: "本地任务" }, { value: "restful", text: "Restful任务" }]
    const local_types = [{ value: "dll", text: "dll" }, { value: "exe", text: "exe" }]
    const taskDetailVisible = ref(false);// 任务详情
    var selData = reactive({ jobid: "" })
    const type = ref("")
    const statusId = ref(0)
    const editRowKey = ref(0);//编辑的key
    const height = ref(0)//dataGrid的高度
    const popoverVisible = ref(false)
    const params = reactive({ "tenant": '' })
    // const store = useStore()
    // console.log(store);
    const changes = ref([])
    const tempType = ref("")
    const statusValue = ref("")
    const dataGrid = ref(null);// dataGrid 表格数据实例
    const dataSource = ref(null);

    loadDataSource();

    function loadDataSource() {
      const url = '/api/timer';
      dataSource.value = Ez.CreateStore({
        key: 'id',
        loadUrl: `${url}/list`,
        insertUrl: `${url}/create-dev`,
        updateUrl: `${url}/update-dev`,
        deleteUrl: `${url}/delete`,
      });
    }

    // 头部工具栏
    function onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift(
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
              params.tenant = data?.value;
              // 执行刷新
              dataGrid.value.instance.refresh()
              dataGrid.value.instance.clearSelection()
            },
          },
        },
        {
          location: 'before',
          widget: 'dxButton',
          options: {
            width: 120,
            type: 'success',
            icon: 'link',
            text: '恢复正常',
            onClick: () => {
              handelStatus("normal")
            },
          },
        }, {
        location: 'before',
        widget: 'dxButton',
        options: {
          width: 120,
          type: 'default',
          icon: 'video',
          text: '暂停',
          onClick: () => {
            handelStatus("suspend")
          },
        },
      }
      )
    }
    onMounted(
      // function () {
      //   const vnode = h(LogDetail, props)
      //   render(vnode, document.body)
      //   console.log(vnode);
      // }(),

      window.onresize = function () {
        setTimeout(() => {
          height.value = window.innerHeight - 150;
          // dataGrid.value.instance.refresh()
        }, 300);
      }
    )
    // 初始化
    function onContentReady() {
      document.querySelector(".dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit").innerText = "操作"
      document.querySelector(".dx-freespace-row").style.height = 0;
    }
    // 显示日志
    function toggleTaskDetailVisble(key, value = "local") {
      selData.jobid = key
      type.value = value
      taskDetailVisible.value = true
    }

    const statusText = computed(() => {
      return statusArr.filter(item => item.editable).map(item => item.value)
    })
    const getTaskType = computed(() => {
      return changes.value[0]?.data?.task_way ?? null
    })

    // 处理编辑时的任务方式
    function editingStart(res) {
      tempType.value = res.data.task_way
    }
    function onRowDblClick(e) {
      e.component.editRow(e.component.getRowIndexByKey(e.key));
    }
    // 修改任务状态
    function handelStatus(type) {

      let fn = type === "normal" ? startTimerJob : stopTimerJob
      if (!selData.jobid) {
        return notify({
          message: "请先选中后一条数据后再操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      if ((type === "normal" && ["offline", "suspend"].indexOf(selData.status) < 0)) {
        return notify({
          message: "非离线状态或暂停不可执行恢复操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      if (type === "suspend" && selData.status !== 'normal') {
        return notify({
          message: "非正常状态不可执行暂停操作",
          position: {
            my: 'center center',
            at: 'center center'
          },
          width: 200
        }, 'error', 2000);
      }
      var formData = new FormData()
      formData.append("key", selData.jobid)
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


    watch(getTaskType, (newVal) => {
      tempType.value = newVal
    })
    // 选中的data
    const onSelectionChanged = function ({ selectedRowsData }) {
      selData = selectedRowsData[0];
    }


    return {
      dataGrid,//dataGrid 实例
      dataSource,
      task_ways,
      statusId,
      type,
      statusArr,
      pageSizes: [5, 10, 20],
      taskDetailVisible,
      popoverVisible,
      editRowKey,
      selData,
      height,

      changes,
      tempType,
      local_types,
      statusText,
      statusValue,
      onContentReady,
      editingStart,
      toggleTaskDetailVisble,
      onSelectionChanged,
      onToolbarPreparing,
      onRowDblClick
    }
  },

}
</script>

<style lang="less" scoped>
.task-a {
  a {
    display: block;
    width: 100%;
    cursor: pointer;
  }
}

.dx-row-focused {
  .task-a {
    color: #fff;
  }

  a {
    color: #fff;
  }
}

.text-center {
  text-align: center;
}

.dx-field-value-static,
.dx-field-value:not(.dx-switch):not(.dx-checkbox):not(.dx-button) {
  width: 75%;
}

.status {
  text-align: center;
}

.text-normal {
  color: #5cb85c;
}

.text-suspend {
  color: #eb6c55;
}

.text-error {
  color: #f70a02;
}
</style>

