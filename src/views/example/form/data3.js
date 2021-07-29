const data = {
  colCount: 1,
  labelLocation: 'left',
  items: [
    {
      itemType: 'group',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'Doc_Seq_Type',
          label: {
            text: '业务单证类型',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'Doc_Seq_No',
          label: {
            text: '业务单证统一编号',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'Upload_Card',
          label: {
            text: '上传人IC卡号',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'Modify_Time',
          label: {
            text: '变更/修改次数',
          },
          editorType: 'dxNumberBox',
          dataType: 'number',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'Att_Doc_Format',
          label: {
            text: '随附单据格式',
          },
          editorType: 'dxSelectBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: '/api/Admin/IPublic/GetParameterByCode?code=license_form_format',
          },
        },
        {
          dataField: 'Att_Doc_Type',
          label: {
            text: '随附单据类型',
          },
          editorType: 'dxSelectBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            searchTimeout: 50,
            dataSource: '/api/Admin/IPublic/GetParameterByCode?code=license_form_type',
          },
        },
        {
          dataField: 'Att_Doc_No',
          label: {
            text: '随附单据编号',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'Att_Doc_Cop',
          label: {
            text: '随附单据所属单位',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 3,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          itemType: 'empty',
          colSpan: 1,
          cssClass: 'Att_Doc_Cop_Refresh-css',
        },
        {
          dataField: 'Att_Doc_Cop_Name',
          label: {
            text: '随附单据所属单位名称',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'G_No',
          label: {
            text: '清单商品序号',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'File_Path',
          label: {
            text: '随附单据文件',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 6,
          validationRules: [],
          editorOptions: {
            width: '100%',
          },
        },
        {
          itemType: 'empty',
          colSpan: 2,
          cssClass: 'button_File-css',
        },
      ],
    },
    {
      itemType: 'group',
      colCount: 6,
      colSpan: 1,
      items: [],
    },
  ],
  hidden: {
    Att_Doc_Cop_Refresh: '',
    button_File: '',
    File_Name: '',
    ID: '',
  },
  container: {},
  tabField: [
    'Doc_Seq_Type',
    'Doc_Seq_No',
    'Upload_Card',
    'Modify_Time',
    'Att_Doc_Format',
    'Att_Doc_Type',
    'Att_Doc_No',
    'Att_Doc_Cop',
    'Att_Doc_Cop_Name',
    'G_No',
    'File_Path',
  ],
};
export default {
  getFormOption() {
    return data;
  },
};
