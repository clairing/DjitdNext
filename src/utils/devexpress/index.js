import { createVNode, render } from 'vue';
import { useUserStore } from '/@/store/modules/user'; // 获取user的store
import Form from '/@/components/DxForm/index.vue';
import dataSource from './data1.js';
//Ez框架
var Ez = {
  Name: 'EzFramework',
  Version: 'beta v0.0.0.1',
  DevIcons:
    '|arrowdown|arrowright|arrowup|spinleft|spinright|spinnext|spinprev|spindown|spinup|chevronleft|chevronright|chevronnext|chevronprev|chevrondown|chevronup|back|repeat|add|airplane|bookmark|box|car|card|cart|chart|check|clear|clock|close|coffee|comment|doc|download|edit|email|event|favorites|find|filter|floppy|folder|food|gift|globe|group|help|home|image|info|key|like|map|menu|message|money|music|overflow|percent|photo|plus|preferences|product|pulldown|refresh|remove|revert|runner|save|search|tags|tel|tips|todo|toolbox|trash|user|upload|',
};
//添加类型判断
(function (ez) {
  ez.Type = {
    isNumber: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Number]';
    },
    isString: function (obj) {
      return Object.prototype.toString.call(obj) === '[object String]';
    },
    isUndefined: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Undefined]';
    },
    isBoolean: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Boolean]';
    },
    isObject: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    },
    isArray: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isFunction: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    },
  };
  ez.rondomNum = function () {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return S4() + S4() + S4() + S4();
  };
  ez.Url = function () {
    var parseParam = function (param, key) {
      if (param) {
        var paramStr = '';
        if (param instanceof String || param instanceof Number || param instanceof Boolean) {
          paramStr += '&' + key + '=' + encodeURIComponent(param);
        } else {
          $.each(param, function (i) {
            if (i) {
              var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
              paramStr += '&' + parseParam(this, k);
            }
          });
        }
        return paramStr.substr(1);
      }
    };
    var count = arguments.length;
    if (count === 0) return;
    var _url, _args;
    if (count > 1 && arguments[count - 1] instanceof Object) {
      _args = '?' + parseParam(arguments[count - 1]);
      if (count === 2) {
        _url = arguments[0] + _args;
      }
      if (count === 3) {
        _url = '/' + arguments[0] + '/' + arguments[1] + _args;
      }
      if (count === 4) {
        _url = '/' + arguments[0] + '/' + arguments[1] + '/' + arguments[2] + _args;
      }
      location.href = _url;
    } else {
      if (count === 1) {
        _url = arguments[0];
      }
      if (count === 2) {
        _url = '/' + arguments[0] + '/' + arguments[1];
      }
      if (count === 3) {
        _url = '/' + arguments[0] + '/' + arguments[1] + '/' + arguments[2];
      }
      location.href = _url;
    }
  };
  ez.Caching = {
    Local: {
      SetValue: function (key, value) {
        if (window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      },
      SetJsonValue: function (key, value) {
        if (window.localStorage) {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      },
      GetJsonValue: function (key) {
        if (window.localStorage) {
          return JSON.parse(window.localStorage.getItem(key));
        }
        return '';
      },
      GetValue: function (key) {
        if (window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return '';
      },
      Clear: function () {
        if (window.localStorage) {
          window.localStorage.clear();
        }
      },
      Remove: function (key) {
        if (window.localStorage) {
          if (key) {
            window.localStorage.removeItem(key);
          }
        }
      },
    },
    VerLocal: {
      SetValue: function (key, value, ver) {
        if (window.localStorage) {
          if (!ver) {
            ver = new Date().Format('yyyyMMdd');
          }
          var data = {
            value: value,
            ver: ver,
          };
          window.localStorage.setItem(key, JSON.stringify(data));
        }
      },
      GetValue: function (key, ver) {
        if (window.localStorage) {
          if (!ver) {
            ver = new Date().Format('yyyyMMdd');
          }
          var data = JSON.parse(window.localStorage.getItem(key));
          if (data) {
            if (ver !== data.ver) {
              window.localStorage.removeItem(key);
            } else {
              return data.value;
            }
          }
        }
        return '';
      },
      Clear: function () {
        if (window.localStorage) {
          window.localStorage.clear();
        }
      },
      Remove: function (key) {
        if (window.localStorage) {
          if (key) {
            window.localStorage.removeItem(key);
          }
        }
      },
    },
    Session: {
      SetValue: function (key, value) {
        if (window.sessionStorage) {
          window.sessionStorage.setItem(key, value);
        }
      },
      SetJsonValue: function (key, value) {
        if (window.sessionStorage) {
          window.sessionStorage.setItem(key, JSON.stringify(value));
        }
      },
      GetJsonValue: function (key) {
        if (window.sessionStorage) {
          return JSON.parse(window.sessionStorage.getItem(key));
        }
        return '';
      },
      GetValue: function (key) {
        if (window.sessionStorage) {
          return window.sessionStorage.getItem(key);
        }
        return '';
      },
      Clear: function () {
        if (window.sessionStorage) {
          window.sessionStorage.clear();
        }
      },
      Remove: function (key) {
        if (window.sessionStorage) {
          if (key) {
            window.sessionStorage.removeItem(key);
          }
        }
      },
    },
    Cookie: {
      GetValue: function (key) {
        var arr,
          reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)'); //正则匹配
        if ((arr = document.cookie.match(reg))) {
          return unescape(arr[2]);
        } else {
          return null;
        }
      },
      SetValue: function (key, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString();
      },
      Clear: function () {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (var i = 0; i < keys.length; i++)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        }
      },
      Remove: function (key) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = Ez.Caching.Cookie.GetValue(key);
        if (cval !== null) {
          document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
        }
      },
    },
  };
})(Ez);

(function (ez) {
  ez.Form = {
    //初始化表单。id:表单的id；key： 表单配置表中 key；postData:初始值，可以不写；onReady:表单加载完成事件，参数 e；onTabChanged：tabbed类型的选择卡切换事件 ，参数e。
    //onTabChanged:  {onTabChanged:function(e){},onEnter:function(e),onDataChanged:function(e){},basicData:{}} 选择卡切换事件、回车事件、值改变事件
    Init: function (id, key, postData, onReady, onTabChanged) {
      console.log(this);
      if (!ez.Type.isString(key)) {
        throw 'key is required.';
      }
      var _postData,
        _formData,
        _onTabChanged,
        _onEditorEnterKey,
        _onFieldDataChanged,
        _onDataLoaded,
        _basicData;
      if (ez.Type.isFunction(onTabChanged)) {
        _onTabChanged = onTabChanged;
      } else if (ez.Type.isObject(onTabChanged)) {
        if (ez.Type.isFunction(onTabChanged.onEnter)) {
          _onEditorEnterKey = onTabChanged.onEnter;
        }
        if (ez.Type.isFunction(onTabChanged.onTabChanged)) {
          _onTabChanged = onTabChanged.onTabChanged;
        }
        if (ez.Type.isFunction(onTabChanged.onDataChanged)) {
          _onFieldDataChanged = onTabChanged.onDataChanged;
        }
        if (ez.Type.isFunction(onTabChanged.onDataLoaded)) {
          _onDataLoaded = onTabChanged.onDataLoaded;
        }
        if (ez.Type.isObject(onTabChanged.basicData)) {
          _basicData = onTabChanged.basicData;
        }
      }

      if (ez.Type.isObject(postData)) {
        _postData = postData;
      } else if (ez.Type.isFunction(postData)) {
        _formData = postData();
      }
      var setForm = function (op) {
        const container = document.createElement('div');
        const vm = createVNode(Form, op);
        render(vm, container);
        document.getElementById(id).appendChild(container);
      };

      const _options = {
        id,
        options: dataSource.getFormOption(),
      };
      setForm(_options);
    },
    Init2: () => {
      const _options = {
        id: '',
        options: dataSource.getFormOption(),
      };
      // console.log(id.value.options);
      // id.value.options = dataSource.getFormOption();
      // id.value.options = Object.assign({}, dataSource.getFormOption());
      return dataSource.getFormOption();
    },
    // 获取表单
    Get: function (id) {
      // console.log($this.$refs[id].instance);
      console.log(id);
      return id.value;
    },
  };
})(Ez);

(function (ez) {
  ez.GetToken = function () {
    return useUserStore().getToken;
  };
})(Ez);

export default Ez;
