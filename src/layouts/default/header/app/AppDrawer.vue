<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="系统应用选择"
    @ok="handleSubmit"
    width="320px"
  >
    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16">
          <template v-for="item in list" :key="item.title">
            <a-col :span="24">
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon" v-if="item.icon" :icon="item.icon" :color="item.color" />
                    {{ item.title }}
                  </div>
                  <div
                    :class="`${prefixCls}__card-detail`"
                  >基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统</div>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
    </div>
  </BasicDrawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { cardList } from './data';
import { Card, Row, Col, List } from 'ant-design-vue';

export default defineComponent({
  name: "AppDrawer",
  components: {
    BasicDrawer,
    [Card.name]: Card,
    [List.name]: List,
    [List.Item.name]: List.Item,
    [Row.name]: Row,
    [Col.name]: Col,
  },
  emits: ['success'],
  setup(_, { emit }) {
    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      setDrawerProps({ confirmLoading: false, placement: "left" });
      // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
      console.log(data)
    });
    async function handleSubmit() {
      await emit("success");
      closeDrawer();
    }
    return {
      prefixCls: 'list-card',
      list: cardList,
      registerDrawer,
      handleSubmit
    }
  }
})
</script>
<style lang="less" scoped>
.list-card {
  &__link {
    margin-top: 10px;
    font-size: 14px;

    a {
      margin-right: 30px;
    }

    span {
      margin-left: 5px;
    }
  }

  &__card {
    width: 100%;
    margin-bottom: -8px;

    .ant-card-body {
      padding: 16px;
    }

    &-title {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 500;
      color: @text-color;

      .icon {
        margin-top: -5px;
        margin-right: 10px;
        font-size: 38px !important;
      }
    }

    &-detail {
      padding-top: 10px;
      padding-left: 30px;
      font-size: 14px;
      color: @text-color-secondary;
    }
  }
}
</style>
