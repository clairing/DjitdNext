
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { deepMerge } from '/@/utils'; //深度合并
import { useGlobSetting } from '/@/hooks/setting';//全局设置
import { useUserStore } from '/@/store/modules/user';// 用户strore

const { urlPrefix } = useGlobSetting();
const _OPTIONS = {
  updateMethod: 'POST',
  deleteMethod: 'POST',
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {
      Authorization: 'Bearer ' + useUserStore().getToken,
    };
    ajaxOptions.url = urlPrefix + ajaxOptions.url;
    ajaxOptions.xhrFields = { withCredentials: false };
  },
};

export function CreateStore(options) {
  return createStore(deepMerge(options, _OPTIONS));
}
