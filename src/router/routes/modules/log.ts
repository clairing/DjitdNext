import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/log',
  name: 'Log',
  component: LAYOUT,
  redirect: '/log/sql',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '日志管理',
    orderNo: 14,
  },
  children: [
    {
      path: 'visit',
      name: 'Visit',
      component: () => import('/@/views/system/log/visit/index.vue'),
      meta: {
        title: '访问日志',
        icon: '',
      },
    },
    {
      path: 'exception',
      name: 'Exception',
      component: () => import('/@/views/system/log/exception/index.vue'),
      meta: {
        title: '异常日志',
        icon: '',
      },
    },
    {
      path: 'operation',
      name: 'Operation',
      component: () => import('/@/views/system/log/operation/index.vue'),
      meta: {
        title: '操作日志',
        icon: '',
      },
    },
    {
      path: 'sql',
      name: 'SQL',
      component: () => import('/@/views/system/log/sql/index.vue'),
      meta: {
        title: '数据库操作日志',
        icon: '',
      },
    },
  ],
};

export default example;
