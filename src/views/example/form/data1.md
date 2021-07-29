/_ eslint-disable vue/no-unused-components _/ <template> <Card title="表单示例"> <DxForm
      :col-count="options.colCount"
      :ref="id"
      :hint="options.hint"
      :label-location="options.labelLocation"
      :col-count-by-screen="options.colCountByScreen"
    > <DxGroupItem
        v-for="(items, index) in options.items"
        :key="index"
        :item-type="items.itemType"
        :caption="items.caption"
        :col-count="items.colCount"
        :col-span="items.colSpan"
      > <!-- {{ items.items }} --> <template v-if="items.colCountByScreen != null" #default> <DxColCountByScreen
            :lg="items.colCountByScreen.lg"
            :md="items.colCountByScreen.md"
            :sm="items.colCountByScreen.sm"
            :xs="items.colCountByScreen.xs"
          /> </template> <DxItem
          v-for="(cItem, cIndex) in items.items"
          :key="cIndex"
          :data-field="cItem.dataField"
          :col-span="cItem.colSpan"
          :editor-type="cItem.editorType"
          :validation-rules="cItem.validationRules"
          :editor-options="cItem.editorOptions"
          :label="cItem.label"
        /> </DxGroupItem> </DxForm> </Card> </template>

<script>
  //   editorType
  // Specifies which editor UI component is used to display and edit the form item value.

  // Type: String
  // Accepted Values: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox'

  import { defineComponent } from 'vue';
  import { DxAutocomplete } from 'devextreme-vue/autocomplete';
  import { DxForm, DxItem, DxGroupItem, DxColCountByScreen } from 'devextreme-vue/form';
  import data from './data.js';

  export default defineComponent({
    components: {
      DxItem,
      DxForm,
      DxGroupItem,
      DxAutocomplete,
      DxColCountByScreen,
    },
    setup() {
      console.log(data.getFormOption());

      return {
        id: 'form',
        options: data.getFormOption(),
      };
    },
  });
</script>

<style></style>
