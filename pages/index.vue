<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div>
    {{ t("welcome") }}
  </div>
  <div class="w-full flex">
    <div class="hidden md:block w-[450px]"></div>
    <div class="w-full">
      <Slider />
    </div>
  </div>
</template>
