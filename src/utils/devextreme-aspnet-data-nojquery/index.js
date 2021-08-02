import Ez from '/@/utils/devexpress';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { deepMerge } from '/@/utils';

const _OPTIONS = {
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {
      Authorization: 'Bearer ' + Ez.GetToken(),
    };
    ajaxOptions.xhrFields = { withCredentials: false };
  },
};

export function CreateStore(options) {
  return createStore(deepMerge(options, _OPTIONS));
}
