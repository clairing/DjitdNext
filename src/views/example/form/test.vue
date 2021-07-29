/_ eslint-disable vue/no-unused-components _/
<template>
  <Card title="表单示例">
    <button @click="getData">点击获取数据</button>
    <form action="your-action" @submit="handleSubmit">
      <DxForm
        :col-count="options.colCount"
        ref="dxForm"
        :hint="options.hint"
        :form-data="formData"
        :label-location="options.labelLocation"
        :col-count-by-screen="options.colCountByScreen"
      >
        <DxButtonItem :button-options="buttonOptions" horizontal-alignment="left" />
        <DxGroupItem
          v-for="(items, index) in options.items"
          :key="index"
          :item-type="items.itemType"
          :caption="items.caption"
          :col-count="items.colCount"
          :col-span="items.colSpan"
        >
          <!-- {{ items.colCountByScreen }} -->
          <template v-if="items.colCountByScreen" #default>
            <DxColCountByScreen
              v-if="items.colCountByScreen != null"
              :lg="items.colCountByScreen.lg"
              :md="items.colCountByScreen.md"
              :sm="items.colCountByScreen.sm"
              :xs="items.colCountByScreen.xs"
            />
          </template>
          <DxItem
            v-for="(cItem, cIndex) in items.items"
            :key="cIndex"
            :col-span="cItem.colSpan"
            :data-field="cItem.dataField"
            :editor-type="cItem.editorType"
            :validation-rules="cItem.validationRules"
            :editor-options="cItem.editorOptions"
            :label="cItem.label"
          />
        </DxGroupItem>
      </DxForm>
    </form>
  </Card>
</template>

<script>
  //   editorType
  // Specifies which editor UI component is used to display and edit the form item value.

  // Type: String
  // Accepted Values: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox'

  import { defineComponent, ref } from 'vue';
  import { DxAutocomplete } from 'devextreme-vue/autocomplete';
  import {
    DxForm,
    DxItem,
    DxGroupItem,
    DxColCountByScreen,
    DxButtonItem,
  } from 'devextreme-vue/form';
  import data from './data3.js';

  export default defineComponent({
    components: {
      DxItem,
      DxForm,
      DxGroupItem,
      DxAutocomplete,
      DxButtonItem,
      DxColCountByScreen,
    },
    setup() {
      const dxForm = ref();
      function handleSubmit(e) {
        console.log(dxForm.value.instance);
        e.preventDefault();
      }

      function getData() {
        console.log(dxForm.value.instance.option('formData'));
      }

      return {
        formData: {},
        dxForm,
        options: data.getFormOption(),
        buttonOptions: {
          text: 'Register',
          type: 'success',

          useSubmitBehavior: true,
        },
        handleSubmit,
        getData,
      };
    },
  });
</script>

<style></style>
