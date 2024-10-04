<template>
  <div
    class="hidden md:flex justify-between items-center h-[75px] bg-charade-900 max-w-[1350px] w-[95%] rounded-2xl mx-auto mt-2"
  >
    <div class="flex justify-between items-center w-full">
      <!-- Display the logo if available -->
      <img v-if="logo" :src="logo" alt="Gamma" class="h-12 w-[150px] ml-5" />
      <div class="flex items-center">
        <UIcon size="26" name="i-ph:user" class="mr-3 text-white" />
        <UIcon size="26" name="i-ph:heart-straight" class="mr-5 text-white" />
        <DarkModeSwitcher class="mr-4" />
      </div>
    </div>
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
