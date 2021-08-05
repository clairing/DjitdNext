<template>
  <Card title="DataGrid用例">
    <DxDataGrid :data-source="dataSourceConfig">
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

      <DxColumn
        data-field="Task_Priority"
        caption="Priority"
        name="Priority"
        :hiding-priority="1"
      />

      <DxColumn
        data-field="Task_Completion"
        caption="Completion"
        :hiding-priority="0"
        fixed="true"
        fixed-Position="right"
        cell-template="phoneTemplate"
      />
      <template #phoneTemplate="{ data }">{{ data.text }}1</template>
    </DxDataGrid>
  </Card>
</template>

<script>
  // import { DataGrid } from '/@/components/DxDataGrid';
  import 'devextreme/data/odata/store';
  import {
    DxLookup,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxColumn,
    DxDataGrid,
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
