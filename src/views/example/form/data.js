const data = {
  colCount: 1,
  colCountByScreen: {
    lg: 1,
  },
  hint: '提示',
  labelLocation: 'left',
  items: [
    {
      itemType: 'group',
      code: 'groupcode1',
      caption: '分组一',
      colCount: 6,
      colCountByScreen: {
        lg: 8,
        md: 6,
        sm: 2,
        xs: 2,
      },
      items: [
        {
          dataField: 'col',
          label: {
            text: '列一',
          },
          editorType: 'dxNumberBox',
          colSpan: 1,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
            value: '1',
          },
        },
        {
          dataField: 'col2',
          label: {
            text: '列二',
          },
          editorType: 'dxDateBox',
          colSpan: 1,
          helpText: '帮助提示',
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
            hint: '悬浮提示',
          },
        },
        {
          itemType: 'empty',
          colSpan: 2,
          cssClass: 'col3-css',
        },
        {
          dataField: 'col4',
          label: {
            text: '列',
            visible: false,
          },
          editorType: 'dxTextBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '提示1',
          },
        },
        {
          dataField: 'col5',
          label: {
            text: '列',
            visible: false,
          },
          editorType: 'dxTextBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '提示2',
          },
        },
        {
          dataField: 'col6',
          label: {
            text: '列三',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '提示',
            valueExpr: 'qq',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: '_local.BasicData.CIQ_APTT_NAME_E',
          },
        },
        {
          dataField: 'col8',
          label: {
            text: '级联二级',
          },
          editorType: 'dxSelectBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: '11111',
            displayExpr: 'text',
            searchTimeout: 50,
          },
        },
        {
          dataField: 'col7',
          label: {
            text: '级联一级',
          },
          editorType: 'dxSelectBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: 'https://base.djitd.com/api/DevParameters/?sys=DJITD&code=status&tenant=0',
          },
        },
        {
          dataField: 'col9',
          label: {
            text: 'combox',
          },
          editorType: 'dxSelectBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '1',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: 'https://base.djitd.com/api/DevParameters/?sys=DJITD&code=status&tenant=0',
          },
        },
        {
          dataField: 'col10',
          label: {
            text: 'autocomplete',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: '_local.BasicData.CIQ_APTT_NAME_E',
          },
        },
        {
          dataField: 'col11',
          label: {
            text: '单选框1',
          },
          editorType: 'dxCheckBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'col13',
          editorType: 'dxCheckBox',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'bk-2',
          label: {
            text: '审核结果',
          },
          editorType: 'dxSelectBox',
          dataType: 'string',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'Value',
            displayExpr: 'Text',
            searchTimeout: 50,
            dataSource: '/api/GeneralTradeAEO/IBaseInfo/GetReviewType',
          },
        },
        {
          dataField: 'null',
          label: {
            text: '测试',
          },
          editorType: 'dxCalendar',
          colSpan: 1,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '分组二',
      colSpan: 1,
      items: [
        {
          itemType: 'tabbed',
          tabPanelOptions: {
            deferRendering: false,
          },
          tabs: [
            {
              title: '分组二',
              colCount: 6,
              colSpan: 1,
              items: [],
            },
            {
              title: '分组三',
              colCount: 6,
              items: [],
            },
            {
              title: '分组四',
              colCount: 6,
              items: [],
            },
            {
              title: '分组五',
              colCount: 6,
              colSpan: 3,
              items: [],
            },
          ],
        },
      ],
    },
    {
      itemType: 'group',
      caption: 'Tab二',
      colSpan: 1,
      items: [
        {
          itemType: 'tabbed',
          tabPanelOptions: {
            deferRendering: false,
          },
          tabs: [],
        },
      ],
    },
    {
      itemType: 'group',
      colSpan: 1,
      items: [
        {
          itemType: 'tabbed',
          tabPanelOptions: {
            deferRendering: false,
          },
          tabs: [
            {
              title: null,
              code: '2',
              colCount: 6,
              colSpan: 1,
              items: [],
            },
          ],
        },
      ],
    },
  ],
  hidden: {
    col3: '',
  },
  container: {},
  tabField: [
    'col',
    'col2',
    'col4',
    'col5',
    'col6',
    'col8',
    'col7',
    'col9',
    'col10',
    'col11',
    'col13',
    'bk-2',
    'null',
  ],
};
export default {
  getFormOption() {
    return data;
  },
};
