<template>
  <div>
    <DxDataGrid :show-border="true" :data-source="dataSource" :height=300 key-expr="drid" :show-column-lines="true"
      :show-row-lines="true" :show-borders="true" :row-alternation-enabled="true" :column-auto-width="true"
      :column-hiding-enabled="false" :column-fixing="{ enabled: true }" :repaint-changes-only="true"
      :grouping="{ autoExpandAll: true }" :group-panel="{ visible: false }" :scrolling="{
        showScrollbar: 'always',
        useNative: false
      }" :column-resizing-mode="'widget'">
      <DxPaging :page-size="10" />
      <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
      <DxColumn data-field="invoked_time" caption="调用时间"></DxColumn>
      <DxColumn data-field="ds_code" caption="主服务编码" :width="120" />
      <DxColumn data-field="tenant_id" caption="编码" :width="100" />
      <DxColumn data-field="org_id" caption="企业" :width="120" />
      <DxColumn data-field="dm_code" caption="企业服务编码"></DxColumn>
      <DxColumn data-field="status" caption="状态"></DxColumn>
      <DxColumn data-field="message" caption="消息"></DxColumn>
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxPager
} from 'devextreme-vue/data-grid'
import { reactive, watch, getCurrentInstance, ref } from 'vue'
import { createStore } from "devextreme-aspnet-data-nojquery"

export default {
  props: {
    // 传递的参数
    paramaid: {
      type: Number,
      default: 0
    },
    // 日志类型 type:"service": 主任务  grant :"开通记录" grant:'机构租户'
    operate: {
      type: String,
      default: ""
    },
    tenant_id: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const params = reactive({ paramaid: props.paramaid, tenant: props.tenant_id, operate: props.operate })
    const dataSource = ref(null)
    // 获取当前vue实例
    const { ctx } = getCurrentInstance()
    let apiUrl = ctx.$appInfo.apiUrl
    const url = `${apiUrl}/api/grantrecord/getgrants`;
    watch(() => props.paramaid, (newVal, oldVal) => {
      params.paramaid = newVal || oldVal
      params.tenant = props.tenant_id
      loadLogs()
    })
    function loadLogs() {
      console.log(params);
      dataSource.value = createStore({
        key: "dgid",
        loadUrl: `${url}`,
        loadParams: params,
        onBeforeSend: (method, ajaxOptions) => {
          ajaxOptions.xhrFields = { withCredentials: false }
        }
      })
    }
    return {
      dataSource,
      pageSizes: [5, 10, 20]
    }
  },
  components: {
    DxColumn,
    DxDataGrid,
    DxPaging,
    DxPager
  }
}
</script>

<style scoped>
</style>
