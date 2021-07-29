import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
// import { t } from '/@/hooks/web/useI18n';

const example: AppRouteModule = {
  path: '/example',
  name: 'Example',
  component: LAYOUT,
  redirect: '/example/datagrid',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '示例',
  },
  children: [
    {
      path: 'datagrid',
      name: 'DataGrid',
      component: () => import('/@/views/example/data-grid/index.vue'),
      meta: {
        title: 'DataGrid',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'form',
      name: 'Form',
      component: () => import('/@/views/example/form/index.vue'),
      meta: {
        title: 'Form',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default example;
