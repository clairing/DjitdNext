import { Icon } from './Icon';
import { Button } from './Button';
import { Card } from './Card';
// import { DataGrid, DxColumn as Column } from './DxDataGrid';
import {
  // Need
  Button as AntButton,
  Input,
  List,
} from 'ant-design-vue';

import { App } from 'vue';

const compList = [Icon, AntButton.Group, Card, List];

export function registerGlobComp(app: App) {
  compList.forEach((comp: any) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Card);
}
