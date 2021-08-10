import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/application',
  meta: {
    orderNo: 90,
    icon: 'simple-icons:about-dot-me',
    title: '系统管理',
  },
  children: [
    {
      path: 'tenant',
      name: 'Tenant',
      component: () => import('/@/views/system/tenant/index.vue'),
      meta: {
        title: '租户管理',
        icon: '',
      },
    },
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        icon: '',
      },
    },
    {
      path: 'application',
      name: 'Application',
      component: () => import('/@/views/system/application/index.vue'),
      meta: {
        title: '应用管理',
        icon: '',
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/system/role/index.vue'),
      meta: {
        title: '角色管理',
        icon: '',
      },
    },
  ],
};

export default example;
