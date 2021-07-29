<template>
  <DxDataGrid
    class="dx-card wide-card"
    :data-source="dataSourceConfig"
    :page-size="6"
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
  >
    <DxPaging :page-size="10" />
    <DxPager :show-page-size-selector="true" :show-info="true" />
    <DxFilterRow :visible="true" />
    <DxColumn data-field="Task_ID" :width="90" :hiding-priority="2" />
    <DxColumn caption="Address">
      <DxColumn data-field="City" />
      <DxColumn data-field="Street" />
      <DxColumn data-field="Apartment" />
    </DxColumn>
    <DxColumn
      data-field="Subject"
      caption="任务"
      :width="190"
      :hiding-priority="8"
      :allow-filtering="true"
    />

    <DxColumn data-field="Task_Status" caption="Status" :hiding-priority="6" />

    <DxColumn data-field="Task_Priority" caption="Priority" :hiding-priority="5">
      <DxLookup display-expr="name" value-expr="value" :data-source="priorities" />
    </DxColumn>

    <DxColumn
      data-field="ResponsibleEmployee.Employee_Full_Name"
      caption="Assigned To"
      :allow-sorting="false"
      :hiding-priority="7"
    />

    <DxColumn
      data-field="Task_Start_Date"
      caption="Start Date"
      data-type="date"
      :hiding-priority="3"
    />

    <DxColumn data-field="Task_Due_Date" caption="日期" data-type="date" :hiding-priority="4" />

    <DxColumn data-field="Task_Priority" caption="Priority" name="Priority" :hiding-priority="1" />

    <DxColumn
      data-field="Task_Completion"
      caption="Completion"
      :hiding-priority="0"
      fixed="true"
      fixed-Position="right"
    />
  </DxDataGrid>
</template>

<script>
  import 'devextreme/data/odata/store';
  import {
    DxDataGrid,
    DxLookup,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxColumn,
  } from 'devextreme-vue/data-grid';
  import { ref, onMounted, defineComponent } from 'vue';

  const priorities = [
    { name: 'High', value: 4 },
    { name: 'Urgent', value: 3 },
    { name: 'Normal', value: 2 },
    { name: 'Low', value: 1 },
  ];

  export default defineComponent({
    name: 'Example',
    components: {
      DxFilterRow,
      DxDataGrid,
      DxLookup,
      DxColumn,
      DxPager,
      DxPaging,
    },
    setup() {
      const dgHeight = ref(0);
      const dataSourceConfig = {
        store: {
          type: 'odata',
          key: 'Task_ID',
          url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
        },
        expand: 'ResponsibleEmployee',
        select: [
          'Task_ID',
          'Task_Subject',
          'Task_Start_Date',
          'Task_Due_Date',
          'Task_Status',
          'Task_Priority',
          'Task_Completion',
          'ResponsibleEmployee/Employee_Full_Name',
        ],
      };
      onMounted(
        (window.onresize = function () {
          dgHeight.value = window.innerHeight - 150;
        })
      );
      return {
        dgHeight, // ddatagrid高度
        dataSourceConfig,
        priorities,
      };
    },
  });
</script>
