<template>
  <DxDataGrid
    v-bind="$attrs"
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
    <DxPaging :page-size="pageSize" />
    <DxPager :show-page-size-selector="true" :show-info="true" :allowed-page-sizes="pageSizes" />
    <DxFilterRow :visible="true" />
    <DxColumnChooser :enabled="true" />
    <DxExport :enabled="true" :allow-export-selected-data="true" />
    <slot></slot>
  </DxDataGrid>
</template>

<script>
  import {
    DxDataGrid,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxColumnChooser,
    DxExport,
  } from 'devextreme-vue/data-grid';
  import { onMounted, ref, defineComponent } from 'vue';
  export default defineComponent({
    // name: 'DataGrid',
    components: {
      DxDataGrid,
      DxPaging,
      DxPager,
      DxFilterRow,
      DxColumnChooser,
      DxExport,
    },
    inheritAttrs: true,
    props: {
      pageSize: {
        type: Number,
        default: 20,
      },
      height: {
        type: Number,
        default: 0,
      },
    },
    setup(props, { attrs }) {
      console.log(attrs);
      const dgHeight = ref(0);
      const pageNum = ref(20);
      function onContentReady() {
        document.querySelector(
          '.dx-datagrid-headers .dx-datagrid-table .dx-header-row .dx-command-edit'
        ).innerHTML = '操作';
      }
      onMounted(
        (window.onresize = function () {
          dgHeight.value = props.height > 0 ? props.height : window.innerHeight - 150;
        })
      );
      return {
        dgHeight,
        pageNum,
        pageSizes: [5, 10, 20, 50, 100],
        onContentReady,
      };
    },
  });
</script>

<style></style>
