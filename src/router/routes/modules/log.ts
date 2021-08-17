import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/logs',
  name: 'Logs',
  component: LAYOUT,
  redirect: '/logs/sql',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '日志管理',
    orderNo: 14,
  },
  children: [
    {
      path: 'visit',
      name: 'Visit',
      component: () => import('/@/views/system/logs/visit/index.vue'),
      meta: {
        title: '访问日志',
        icon: '',
      },
    },
    {
      path: 'exception',
      name: 'Exception',
      component: () => import('/@/views/system/logs/exception/index.vue'),
      meta: {
        title: '异常日志',
        icon: '',
      },
    },
    {
      path: 'operation',
      name: 'Operation',
      component: () => import('/@/views/system/logs/operation/index.vue'),
      meta: {
        title: '操作日志',
        icon: '',
      },
    },
    {
      path: 'sql',
      name: 'SQL',
      component: () => import('/@/views/system/logs/sql/index.vue'),
      meta: {
        title: '数据库操作日志',
        icon: '',
      },
    },
  ],
};

export default example;
