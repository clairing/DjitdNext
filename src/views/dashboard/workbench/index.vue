<template>
  <PageWrapper>
    <template #headerContent>
      <WorkbenchHeader />
    </template>
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard :loading="loading" class="enter-y" />
        <DynamicInfo :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="w-full lg:w-3/10 enter-y">
        <QuickNav :loading="loading" class="enter-y" />

        <Card class="!my-4 enter-y" :loading="loading">
          <img class="mx-auto xl:h-50 h-30" src="../../../assets/svg/illustration.svg" />
        </Card>

        <SaleRadar :loading="loading" class="enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Card } from 'ant-design-vue';
import { PageWrapper } from '/@/components/Page';
import WorkbenchHeader from './components/WorkbenchHeader.vue';
import ProjectCard from './components/ProjectCard.vue';
import QuickNav from './components/QuickNav.vue';
import DynamicInfo from './components/DynamicInfo.vue';
import SaleRadar from './components/SaleRadar.vue';
import { Ez } from '/@/utils/devexpress';

export default defineComponent({
  components: {
    PageWrapper,
    WorkbenchHeader,
    ProjectCard,
    QuickNav,
    DynamicInfo,
    SaleRadar,
    Card,
  },
  setup() {
    console.log(
      Ez.BasicData('customs', 'Incoterm').then((res) => {
        return console.log(res.data);
      })
    );

    const loading = ref(true);

    setTimeout(() => {
      loading.value = false;
    }, 1500);

    return {
      loading,
    };
  },
});
</script>
