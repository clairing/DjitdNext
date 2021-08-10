<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <div>当前所属租户:上海捷艾特信息技术有限公司</div>

      <div>以下租户已登录,请选择直接进入</div>
      <ul class="list">
        <template v-for="item in data" :key="item.tenant_id">
          <li>
            <div @click="selectTenant(item.tenant_id)">{{ item.tenant_name }}</div>
          </li>
        </template>
      </ul>

      <Divider class="enter-x">没有你要选择的租户，点击下方返回登录其他账号</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </div>
  </template>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button, Divider, List } from 'ant-design-vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, LoginStateEnum } from './useLogin';
  import { router } from '/@/router';
  import { PageEnum } from '/@/enums/pageEnum';

  const data = [
    { tenant_id: 1, tenant_name: '上海捷艾特信息技术有限公司' },
    { tenant_id: 2, tenant_name: '上海兴亚报关有限公司' },
    { tenant_id: 3, tenant_name: 'xxxxxxxx有限公司' },
  ];

  export default defineComponent({
    name: 'QrCodeForm11',
    components: {
      Button,
      Divider,
      List,
      LoginFormTitle,
    },
    setup() {
      const { t } = useI18n();
      const { handleBackLogin, getLoginState } = useLoginState();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.SELECT_TENANT);
      // 多家租户选择一个租户
      function selectTenant(data: any) {
        console.log(data);
        router.replace(PageEnum.BASE_HOME);
      }

      return {
        data,
        t,
        handleBackLogin,
        selectTenant,
        getShow,
      };
    },
  });
</script>
<style scoped>
  ul li {
    cursor: pointer;
    padding: 5px;
    border-top: 1px solid #ddd;
  }
  ul {
    padding: 10px;
    line-height: 1.375;
  }
</style>
