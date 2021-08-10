<!--
 * @Author: Vben
 * @Description: Multi-language switching component
-->
<template>
  <Dropdown
    placement="bottomCenter"
    :trigger="['click']"
    :dropMenuList="localeList"
    :selectedKeys="selectedKeys"
    @menuEvent="handleMenuEvent"
    overlayClassName="app-sys-picker-overlay"
  >
    <span class="flex items-center cursor-pointer">
      <Icon icon="ion:grid-outline" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </Dropdown>
</template>
<script lang="ts">
  // import type { LocaleType } from '/#/config';
  // import type { DropMenu } from '/@/components/Dropdown';
  import { defineComponent, ref, watchEffect, unref, computed } from 'vue';
  import { Dropdown } from '/@/components/Dropdown';
  import { Icon } from '/@/components/Icon';
  import { useLocale } from '/@/locales/useLocale';
  // import { localeList } from '/@/settings/localeSetting';

  const props = {
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: true },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
  };
  const localeList = [
    {
      text: '系统111',
      event: '11',
    },
    {
      text: '系统222',
      event: '22',
    },
  ];
  export default defineComponent({
    name: 'AppSysPicker',
    components: { Dropdown, Icon },
    props,
    setup() {
      const selectedKeys = ref<string[]>([]);

      const { getLocale } = useLocale();
      console.log(getLocale);

      const getLocaleText = computed(() => {
        const key = selectedKeys.value[0];
        if (!key) {
          return '';
        }
        return localeList.find((item) => item.event === key)?.text;
      });

      watchEffect(() => {
        selectedKeys.value = [unref(getLocale)];
      });

      // function toggleLocale(e) {
      //   console.log(e);
      //   props.reload && location.reload();
      // }

      function handleMenuEvent(e) {
        console.log(e);
        // if (unref(getLocale) === menu.event) {
        //   return;
        // }
        // toggleLocale(menu.event as string);
      }

      return { localeList, handleMenuEvent, selectedKeys, getLocaleText };
    },
  });
</script>

<style lang="less">
  .app-locale-picker-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
</style>
