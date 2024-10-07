<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div>
    <div class="w-full flex mt-5">
      <div class="hidden lg:block w-[460px]"></div>
      <div class="w-full">
        <Slider />
      </div>
    </div>
    <TopCategory class="self-center" />
    <DiscoutedProducts />
  </div>
</template>
