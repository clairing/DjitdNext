<template>
  <form :action="options.POST_URL" @submit="handleSubmit" :id="formId" method="post">
    <DxForm
      ref="dxForm"
      :col-count="options.colCount"
      :hint="options.hint"
      :form-data="formData"
      :label-location="options.labelLocation"
      :col-count-by-screen="options.colCountByScreen"
    >
      <DxGroupItem
        v-for="(items, index) in options.items"
        :key="index"
        :item-type="items.itemType"
        :caption="items.caption"
        :col-count="items.colCount"
        :col-span="items.colSpan"
      >
        <template #default>
          <template v-if="items.colCountByScreen">
            <DxColCountByScreen
              v-if="items.colCountByScreen"
              :lg="items.colCountByScreen.lg ? items.colCountByScreen.lg : ''"
              :md="items.colCountByScreen.md ? items.colCountByScreen.md : ''"
              :sm="items.colCountByScreen.sm ? items.colCountByScreen.sm : ''"
              :xs="items.colCountByScreen.xs ? items.colCountByScreen.xs : ''"
            />
          </template>
          <template v-for="(cItem, cIndex) in items.items" :key="cIndex">
            <DxItem
              :key="cIndex"
              v-if="cItem.itemType != 'tabbed' && cItem.itemType != 'empty'"
              :col-span="cItem.colSpan"
              :data-field="cItem.dataField"
              :editor-type="cItem.editorType"
              :validation-rules="cItem.validationRules"
              :editor-options="
                handleEditorOptions(cItem.editorOptions, cItem.editorType, cItem.dataField)
              "
              :label="cItem.label"
            />
            <DxEmptyItem
              v-if="cItem.itemType === 'empty'"
              :col-span="cItem.colSpan"
              :css-class="cItem.cssClass"
            />
            <DxTabbedItem v-if="cItem.itemType == 'tabbed'">
              <DxTabPanelOptions :defer-rendering="false" />
              <DxTab
                v-for="(tabs, tabsIndex) in cItem.tabs"
                :key="tabsIndex"
                :title="tabs.title"
                :col-count="tabs.colCount"
                :col-span="tabs.colSpan"
              >
                <template v-if="tabs.items.length > 0">
                  <DxItem
                    v-for="(tabItem, tabItemIndex) in tabs.items"
                    :key="tabItemIndex"
                    :col-span="tabItem.colSpan"
                    :data-field="tabItem.dataField"
                    :editor-type="tabItem.editorType"
                    :validation-rules="tabItem.validationRules"
                    :editor-options="
                      handleEditorOptions(
                        tabItem.editorOptions,
                        tabItem.editorType,
                        tabItem.dataField
                      )
                    "
                    :label="tabItem.label"
                  />
                </template>
              </DxTab>
            </DxTabbedItem>
          </template>
        </template>
      </DxGroupItem>
      <DxGroupItem>
        <DxSimpleItem v-for="(value, key, index) in options.hidden" :key="index">
          <template #default>
            <input type="hidden" :name="key.toString()" :value="value" />
          </template>
        </DxSimpleItem>
      </DxGroupItem>
    </DxForm>
  </form>
</template>

<script>
//   editorType
// Specifies which editor UI component is used to display and edit the form item value.

// Type: String
// Accepted Values: 'dxAutocomplete' | 'dxCalendar' | 'dxCheckBox' | 'dxColorBox' | 'dxDateBox' | 'dxDropDownBox' | 'dxHtmlEditor' | 'dxLookup' | 'dxNumberBox' | 'dxRadioGroup' | 'dxRangeSlider' | 'dxSelectBox' | 'dxSlider' | 'dxSwitch' | 'dxTagBox' | 'dxTextArea' | 'dxTextBox'
import { defineComponent, onMounted, ref } from 'vue';
import { DxAutocomplete } from 'devextreme-vue/autocomplete';
import { createStore } from 'devextreme-aspnet-data-nojquery'; //远程数据源
// import DataSource from 'devextreme/data/data_source'; //本地化数据源'
// import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import BasicData from './jit-data.js';
import { Ez } from '/@/utils/devexpress';
import {
  DxForm,
  DxItem,
  DxTab,
  DxGroupItem,
  DxColCountByScreen,
  DxButtonItem,
  DxTabbedItem,
  DxEmptyItem,
  DxSimpleItem,
  DxTabPanelOptions,
} from 'devextreme-vue/form';

export default defineComponent({
  name: 'Form',
  components: {
    DxItem,
    DxTab,
    DxSimpleItem,
    DxForm,
    DxGroupItem,
    DxAutocomplete,
    DxButtonItem,
    DxTabbedItem,
    DxEmptyItem,
    DxTabPanelOptions,
    DxColCountByScreen,
  },
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          POST_URL: '',
          DATA_URL: '',
          colCount: 0,
          labelLocation: '',
          colCountByScreen: [],
          items: [],
        };
      },
    },
    id: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 表单实例
    const dxForm = ref();
    const params = BasicData.getFormOption();
    function handleSubmit(e) {
      console.log(dxForm.value.instance);
      e.preventDefault();
    }
    // 获取form 表单数据
    function getData() { }
    // console.log(dxForm.value.instance.option('formData'));
    onMounted(() => {
      // if (props.options) {
      //   for (let key in props.options.hidden) {
      //     Ez.Form.SetHiddenValue(dxForm, key, props.options.hidden[key]);
      //   }
      // }
    });
    // 特殊化处理options
    function handleEditorOptions(editorOptions, editorType, dataField) {
      try {
        let _url = editorOptions.dataSource ?? '';
        // console.log(_url);
        switch (editorType) {
          case 'dxAutocomplete':
            if (_url != '') {
              editorOptions.loadParams = {};
              editorOptions.dataSource = new CustomStore({
                key: 'value',
                loadUrl: _url,
                loadParams: function () {
                  return Ez.Form.GetFieldValue(dxForm, dataField);
                },
              });
              editorOptions.itemTemplate = function (data) {
                return data.text;
              };
            }
            break;

          case 'dxSelectBox':
            if (_url != '') {
              var isLocalSource = _url.toString().indexOf('params.') === 0 ?? false;
              var valueExpr = editorOptions.valueExpr;
              editorOptions.dataSource = isLocalSource
                ? null
                : createStore({
                  key: valueExpr,
                  loadUrl: _url,
                });
              if (isLocalSource) {
                editorOptions.items = eval(_url);
              }
            } else {
              return editorOptions;
            }
            break;
          default:
            break;
        }
        _url = '';
        return editorOptions;
      } catch {
        return editorOptions;
      }
    }

    return {
      formId: props.id,
      formData: {},
      dxForm,
      params, //海关参数

      handleEditorOptions,
      handleSubmit,
      getData,
    };
  },
});
</script>

<style>
</style>
