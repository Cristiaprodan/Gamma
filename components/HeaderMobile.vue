<template>
  <div
    class="md:hidden flex justify-between items-center w-full h-[70px] border-b border-accent bg-charade-900 backdrop-blur-sm px-3"
  >
    <DarkModeSwitcher />
    <!-- Display the logo if available -->
    <img v-if="logo" :src="logo" alt="Gamma" class="h-12 w-[150px] ml-5" />
    <UIcon size="30" name="i-ph:list" class="mr-5 text-white" />
  </div>
</template>

<script setup>
import { useAsyncData } from "#imports";
import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

const logo = ref(null);

const {
  data: logoData,
  pending,
  error,
} = await useAsyncData(
  "getLogo",
  () => $fetch("/api/getLogo") // $fetch is Nuxt's wrapper around `fetch` optimized for SSR
);

const config = useRuntimeConfig();

if (logoData.value && logoData.value.Logo) {
  logo.value = `${config.public.baseURL}/${logoData.value.Logo[0].signedPath}`;
}

if (error) {
  console.error("Error fetching logo:", error);
}
</script>
