<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full my-10"
  >
    <div
      class="bg-green-100 h-[90px] rounded-xl flex items-center justify-center gap-4 p-2"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-accent rounded-full"
      >
        <UIcon name="i-ph:truck-thin" class="text-white" size="30" />
      </div>
      <div>
        <h3 class="text-lg font-bold dark:text-charade-950 text-charade-900">
          {{ t("Livrare gratuită") }}
        </h3>
        <p class="text-[13px] text-gray-500">
          {{ t("Livrare gratuită în Chișinău") }}
        </p>
      </div>
    </div>
    <div
      class="bg-green-100 h-[90px] rounded-xl flex items-center justify-center gap-4 p-2"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-accent rounded-full"
      >
        <UIcon name="i-ph:handshake-light" class="text-white" size="30" />
      </div>
      <div>
        <h3 class="text-lg dark:text-charade-950 text-charade-900 font-bold">
          {{ t("100% Satisfacție") }}
        </h3>
        <p class="text-[13px] text-gray-500">
          {{ t("Livrare gratuită în Chișinău") }}
        </p>
      </div>
    </div>
    <div
      class="bg-green-100 h-[90px] rounded-xl flex items-center justify-center gap-4 p-2"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-accent rounded-full"
      >
        <UIcon name="i-ph:credit-card-light" class="text-white" size="30" />
      </div>
      <div>
        <h3 class="text-lg dark:text-charade-950 text-charade-900 font-bold">
          {{ t("Plăți sigure") }}
        </h3>
        <p class="text-[13px] text-gray-500">
          {{ t("Livrare gratuită în Chișinău") }}
        </p>
      </div>
    </div>
    <div
      class="bg-green-100 h-[90px] rounded-xl flex items-center justify-center gap-4 p-2"
    >
      <div
        class="flex items-center justify-center w-12 h-12 bg-accent rounded-full"
      >
        <UIcon name="i-ph:messenger-logo-light" class="text-white" size="30" />
      </div>
      <div>
        <h3 class="text-lg dark:text-charade-950 text-charade-900 font-bold">
          {{ t("Asistență 24/7") }}
        </h3>
        <p class="text-[13px] text-gray-500">
          {{ t("Livrare gratuită în Chișinău") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
