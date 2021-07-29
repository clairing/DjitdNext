const data = {
  DATA_URL: '/api/Manifest/IManifest/HeadData',
  colCount: 1,
  labelLocation: 'left',
  items: [
    {
      itemType: 'group',
      caption: ' 舱单发送、接收方信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'sender_name',
          label: {
            text: '发送方企业',
          },
          editorType: 'dxTextBox',
          dataType: 'string',
          colSpan: 6,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^.{1,13}$',
              message: '最大长度13位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'receiver_code',
          label: {
            text: '接收方船代',
          },
          editorType: 'dxSelectBox',
          dataType: 'string',
          colSpan: 6,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^.{1,13}$',
              message: '最大长度13位',
            },
          ],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Sender',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '订舱信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'bl_no',
          label: {
            text: '提单号',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).)[0-9A-Z]{1,20}$',
              message: '最大长度位20位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'vessel',
          label: {
            text: '船名',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).)[A-Z 0-9-._]{1,35}$',
              message: '最大长度位35位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'voyage',
          label: {
            text: '航次',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).)[A-Z0-9]{1,10}$',
              message: '最大长度位10位,不包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'bl_carry_code',
          label: {
            text: '承运人代码',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,13}$',
              message: '最大长度位13位',
            },
          ],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Carrier',
          },
        },
        {
          dataField: 'type_of_bl_form',
          label: {
            text: '提单类型',
          },
          editorType: 'dxSelectBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,4}$',
              message: '请选择提单类型',
            },
          ],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
          },
        },
        {
          dataField: 'booking_party',
          label: {
            text: '订舱人说明',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,70}$',
              message: '最大长度位70位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'prepaid_or_collect',
          label: {
            text: '付款方式',
          },
          editorType: 'dxSelectBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^.{1}$',
              message: '最大长度位1位',
            },
          ],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Payment',
          },
        },
        {
          dataField: 'freight_clause_i',
          label: {
            text: '运费条款',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,40}$',
              message: '最大长度位40位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'payable_at',
          label: {
            text: '付款地代码',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,5}$',
              message: '最大长度位5位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'booking_no_id',
          label: {
            text: '运编号',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度位35位',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'delivery_term',
          label: {
            text: '交货条款',
          },
          editorType: 'dxSelectBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,20}$',
              message: '最大长度位20位',
            },
          ],
          editorOptions: {
            width: '100%',
            searchEnabled: true,
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Delivery',
            value: 'CY/CY',
          },
        },
        {
          dataField: 'numbers_of_original_bl',
          label: {
            text: '正本提单份数',
          },
          editorType: 'dxNumberBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^\\d{1,6}$',
              message: '需输入数字，最大6位数',
            },
          ],
          editorOptions: {
            width: '100%',
            value: '3',
          },
        },
        {
          dataField: 'place_of_bl_issue',
          label: {
            text: '提单签发地',
          },
          editorType: 'dxTextBox',
          colSpan: 3,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度位35位',
            },
          ],
          editorOptions: {
            width: '100%',
            value: 'SHANGHAI',
          },
        },
        {
          dataField: 'place_of_bl_issue_code',
          label: {
            text: '提单签发地代码',
            visible: false,
          },
          editorType: 'dxTextBox',
          colSpan: 1,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^.{1,5}$',
              message: '最大长度位5位',
            },
          ],
          editorOptions: {
            width: '100%',
            value: 'CNSHA',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '发货人信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'shipper_code',
          label: {
            text: '发货人代码',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[A-Z 0-9-]+(\\+[A-Z0-9-]+)+$',
              message: '格式为：企业代码类型+企业编号',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '企业代码类型+企业编号',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Consignee',
          },
        },
        {
          dataField: 'shipper',
          label: {
            text: '发货人名称',
          },
          colSpan: 8,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度为70位,不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'shipper_country_coded',
          label: {
            text: '国家代码',
          },
          editorType: 'dxAutocomplete',
          dataType: 'string',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{2}$',
              message: '需填入2位大写国家代码',
            },
          ],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Country',
          },
        },
        {
          dataField: 'shipper_street_and_number',
          label: {
            text: '发货人地址',
          },
          colSpan: 8,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度为70位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'shipper_number_te',
          label: {
            text: '电话',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度为50位,不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'shipper_number_em',
          label: {
            text: 'EMAIL',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$',
              message: '需输入正确邮箱格式',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'shipper_number_fx',
          label: {
            text: '传真',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度位50位,不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'shipper_aeo',
          label: {
            text: '发货人AEO代码\t',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度位50位,不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '收货人信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'consignee_code',
          label: {
            text: '收货人代码',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[A-Z 0-9-]+(\\+[A-Z0-9-]+)+$',
              message: '格式为：大写企业代码类型+企业编号',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '企业代码类型+企业编号',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Consignee',
          },
        },
        {
          dataField: 'consignee',
          label: {
            text: '收货人名称',
          },
          colSpan: 8,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度位70位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'consignee_country_coded',
          label: {
            text: '国家',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{2}$',
              message: '需填入2位大写国家代码',
            },
          ],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Country',
          },
        },
        {
          dataField: 'consignee_street_and_number_po_box_treet_and_number',
          label: {
            text: '收货人地址',
          },
          colSpan: 8,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度为70位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'consignee_number_te',
          label: {
            text: '电话',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度为50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'consignee_number_em',
          label: {
            text: 'EMAIL',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$',
              message: '需填入正确邮箱格式',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'consignee_number_fx',
          label: {
            text: '传真',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度为50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'consignee_department_or_employee_contact_name',
          label: {
            text: '收货具体联系人名称',
          },
          colSpan: 12,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,35}$",
              message: '最大长度为35位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'consignee_communication_number_te',
          label: {
            text: '收货具体联系人电话',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度为50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '具体联系人有值、联系方式必填一个',
          },
        },
        {
          dataField: 'consignee_communication_number_em',
          label: {
            text: '收货具体联系人EMAIL',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$',
              message: '需填入正确邮箱格式',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '具体联系人有值、联系方式必填一个',
          },
        },
        {
          dataField: 'consignee_communication_number_fx',
          label: {
            text: '收货具体联系人传真',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度为50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '具体联系人有值、联系方式必填一个',
          },
        },
        {
          dataField: 'consignee_aeo',
          label: {
            text: '收货人AEO代码',
          },
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,20}$",
              message: '最大长度位20位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '通知人信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'notify_code',
          label: {
            text: '通知人代码',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[A-Z 0-9-]+(\\+[A-Z0-9-]+)+$',
              message: '格式为：企业代码类型+企业编号',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '企业代码类型+企业编号',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Consignee',
          },
        },
        {
          dataField: 'notify',
          label: {
            text: '通知人名称',
          },
          editorType: 'dxTextBox',
          colSpan: 8,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度为70位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'notify_country_coded',
          label: {
            text: '国家',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{2}$',
              message: '需填写两位大写国家代码',
            },
          ],
          editorOptions: {
            width: '100%',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Country',
          },
        },
        {
          dataField: 'notify_street_and_number',
          label: {
            text: '通知人地址',
          },
          editorType: 'dxTextBox',
          colSpan: 8,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,70}$",
              message: '最大长度为70位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'notify_number_te',
          label: {
            text: '电话',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度位50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'notify_number_em',
          label: {
            text: 'EMAIL',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$',
              message: '需输入正确邮箱格式',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
        {
          dataField: 'notify_number_fx',
          label: {
            text: '传真',
          },
          editorType: 'dxTextBox',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: "^((?!:|：|').){1,50}$",
              message: '最大长度位50位，不能包含特殊字符',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '电话、邮箱、传真必填一个',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '地点信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'place_receipt',
          label: {
            text: '收货地',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度为35位',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '收货地名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
            value: 'SHANGHAI',
          },
        },
        {
          dataField: 'place_receipt_code',
          label: {
            text: '收货地',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{5}',
              message: '需填写五位大写港口代码',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '收货地代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
            value: 'CNSHA',
          },
        },
        {
          dataField: 'load_port',
          label: {
            text: '装货港',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度为35位',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '装货港名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
            value: 'SHANGHAI',
          },
        },
        {
          dataField: 'load_port_code',
          label: {
            text: '装货港',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{5}',
              message: '需填写五位大写港口代码',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '装货港代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
            value: 'CNSHA',
          },
        },
        {
          dataField: 'discharge_port',
          label: {
            text: '卸货港',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度为35位',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '装货港名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'discharge_port_code',
          label: {
            text: '卸货港',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{5}',
              message: '需填写五位大写港口代码',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '装货港代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'transfer_port',
          label: {
            text: '中转港',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^((?!:|：).){0,35}$',
              message: '最大长度为35位',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '中转港名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'transfer_port_code',
          label: {
            text: '中转港',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [
            {
              type: 'pattern',
              pattern: '^[A-Z]{5}',
              message: '需填写五位大写港口代码',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '中转港代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'final_destination',
          label: {
            text: '目的地',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^((?!:|：).){1,35}$',
              message: '最大长度为35位',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '目的地名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'final_destination_code',
          label: {
            text: '目的地',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^[A-Z]{5}',
              message: '需填写五位大写港口代码',
            },
          ],
          editorOptions: {
            width: '100%',
            placeholder: '目的地代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'delivery_port',
          label: {
            text: '交货地',
          },
          editorType: 'dxAutocomplete',
          colSpan: 4,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '交货地名称',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
        {
          dataField: 'delivery_port_code',
          label: {
            text: '交货地代码',
            visible: false,
          },
          editorType: 'dxAutocomplete',
          colSpan: 2,
          validationRules: [],
          editorOptions: {
            width: '100%',
            placeholder: '交货地代码',
            valueExpr: 'value',
            displayExpr: 'text',
            dataSource: '/api/Manifest/IDropdown/Port',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '总件毛体',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          dataField: 'total_package',
          label: {
            text: '总件数',
          },
          editorType: 'dxNumberBox',
          dataType: 'number',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^(\\d{0,13})(.\\d{0,5})$',
              message: '最多五位小数，最长18位数',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'total_gross_weight',
          label: {
            text: '总毛重',
          },
          editorType: 'dxNumberBox',
          dataType: 'number',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^(\\d{0,13})(.\\d{0,5})$',
              message: '最多五位小数，最长18位数',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
        {
          dataField: 'total_volume',
          label: {
            text: '总体积',
          },
          editorType: 'dxNumberBox',
          dataType: 'number',
          colSpan: 4,
          validationRules: [
            {
              type: 'required',
            },
            {
              type: 'pattern',
              pattern: '^(\\d{0,13})(.\\d{0,5})$',
              message: '最多五位小数，最长18位数',
            },
          ],
          editorOptions: {
            width: '100%',
          },
        },
      ],
    },
    {
      itemType: 'group',
      caption: '货物清单',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          itemType: 'empty',
          colSpan: 12,
          cssClass: 'form_manifest_content-css',
        },
      ],
    },
    {
      itemType: 'group',
      caption: '预配箱信息',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          itemType: 'empty',
          colSpan: 12,
          cssClass: 'form_manifest_box-css',
        },
      ],
    },
    {
      itemType: 'group',
      caption: '已知箱号集装箱细目',
      colCount: 12,
      colSpan: 1,
      items: [
        {
          itemType: 'empty',
          colSpan: 12,
          cssClass: 'form_manifest_box_num-css',
        },
      ],
    },
  ],
  hidden: {
    manifest_state: '',
    master_lcl_no: '',
    form_manifest_content: '',
    form_manifest_box: '',
    form_manifest_box_num: '',
  },
  container: {},
  tabField: [
    'sender_name',
    'receiver_code',
    'bl_no',
    'vessel',
    'voyage',
    'bl_carry_code',
    'type_of_bl_form',
    'booking_party',
    'prepaid_or_collect',
    'freight_clause_i',
    'payable_at',
    'booking_no_id',
    'delivery_term',
    'numbers_of_original_bl',
    'place_of_bl_issue',
    'place_of_bl_issue_code',
    'shipper_code',
    'shipper',
    'shipper_country_coded',
    'shipper_street_and_number',
    'shipper_number_te',
    'shipper_number_em',
    'shipper_number_fx',
    'shipper_aeo',
    'consignee_code',
    'consignee',
    'consignee_country_coded',
    'consignee_street_and_number_po_box_treet_and_number',
    'consignee_number_te',
    'consignee_number_em',
    'consignee_number_fx',
    'consignee_department_or_employee_contact_name',
    'consignee_communication_number_te',
    'consignee_communication_number_em',
    'consignee_communication_number_fx',
    'consignee_aeo',
    'notify_code',
    'notify',
    'notify_country_coded',
    'notify_street_and_number',
    'notify_number_te',
    'notify_number_em',
    'notify_number_fx',
    'place_receipt',
    'place_receipt_code',
    'load_port',
    'load_port_code',
    'discharge_port',
    'discharge_port_code',
    'transfer_port',
    'transfer_port_code',
    'final_destination',
    'final_destination_code',
    'delivery_port',
    'delivery_port_code',
    'total_package',
    'total_gross_weight',
    'total_volume',
  ],
};
export default {
  getFormOption() {
    return data;
  },
};
