// <template>
//   <div>
//     <DxDataGrid :show-border="true" :data-source="dataSource" :height=300 key-expr="dgid" :show-column-lines="true"
//       :show-row-lines="true" :show-borders="true" :row-alternation-enabled="true" :column-auto-width="true"
//       :column-hiding-enabled="false" :column-fixing="{ enabled: true }" :repaint-changes-only="true"
//       :grouping="{ autoExpandAll: true }" :group-panel="{ visible: false }" :scrolling="{
//         showScrollbar: 'always',
//         useNative: false
//       }" :column-resizing-mode="'widget'">
//       <DxPaging :page-size="10" />
//       <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
//       <DxColumn data-field="cby_time" caption="操作时间"></DxColumn>
//       <DxColumn data-field="dm_code" caption="主服务编码类型" :width="120" />
//       <DxColumn data-field="ds_code" caption="编码" :width="100" />
//       <DxColumn data-field="org_id" caption="企业" :width="120" />
//       <DxColumn data-field="charge_type" caption="收费类型"></DxColumn>
//       <DxColumn data-field="service_type" caption="服务类型"></DxColumn>
//       <DxColumn data-field="expire_date" caption="过期时间"></DxColumn>
//       <DxColumn data-field="expire_date_maxcount" caption="剩余次数"></DxColumn>

//     </DxDataGrid>
//   </div>
// </template>

// <script>
// import {
//   DxDataGrid,
//   DxColumn,
//   DxPaging,
//   DxPager
// } from 'devextreme-vue/data-grid'
// import { reactive, watch, getCurrentInstance, ref } from 'vue'
// import { createStore } from "devextreme-aspnet-data-nojquery"

// export default {
//   props: {
//     // 传递的参数
//     paramaid: {
//       type: String,
//       default: ""
//     },
//     // 日志类型 type:"service": 主任务  grant :"开通记录" grant:'机构租户'
//     type: {
//       type: String,
//       default: ""
//     }
//   },
//   setup(props) {
//     console.log(props);
//     const params = reactive({ paramaid: props.paramaid, operate: '' })
//     const dataSource = ref(null)
//     // 获取当前vue实例
//     const { ctx } = getCurrentInstance()
//     let apiUrl = ctx.$appInfo.apiUrl
//     const url = `${apiUrl}/api/grantrecord/getgrants`;
//     watch(() => props.paramaid, (newVal, oldVal) => {
//       params.paramaid = newVal || oldVal
//       loadLogs()
//     })
//     function loadLogs() {
//       dataSource.value = createStore({
//         key: "dgid",
//         loadUrl: `${url}`,
//         loadParams: params,
//         onBeforeSend: (method, ajaxOptions) => {
//           ajaxOptions.xhrFields = { withCredentials: false }
//         },
//         onLoaded(res) {
//           console.log(res);
//         }
//       })
//     }
//     return {
//       dataSource,
//       pageSizes: [5, 10, 20]
//     }
//   },
//   components: {
//     DxColumn,
//     DxDataGrid,
//     DxPaging,
//     DxPager
//   }
// }
// </script>

// <style scoped>
// </style>
