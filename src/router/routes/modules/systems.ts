import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/application',
  meta: {
    orderNo: 9,
    icon: 'simple-icons:about-dot-me',
    title: '系统管理',
  },
  children: [
    {
      path: 'application',
      name: 'Application',
      component: () => import('/@/views/system/application/index.vue'),
      meta: {
        title: '应用管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default example;
