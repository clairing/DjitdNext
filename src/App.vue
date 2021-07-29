<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';

  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';
  import zhMessages from 'devextreme/localization/messages/zh.json';
  import { locale, loadMessages } from 'devextreme/localization';
  export default defineComponent({
    name: 'App',
    components: { ConfigProvider, AppProvider },
    setup() {
      useTitle();
      // DevExpress使用中文
      loadMessages(zhMessages);
      locale(navigator.language);

      // support Multi-language
      const { getAntdLocale } = useLocale();

      return { getAntdLocale };
    },
  });
</script>
