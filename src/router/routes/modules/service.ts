import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/service/tasks',
  name: 'Service',
  component: LAYOUT,
  redirect: '/demo/service/tasks',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '服务管理',
    orderNo: 14,
  },
  children: [
    {
      path: 'task-time',
      name: 'TaskTime',
      component: () => import('/@/views/demo/service/tasks/task-time/index.vue'),
      meta: {
        title: '定时任务',
        icon: '',
      },
    },
  ],
};

export default example;
