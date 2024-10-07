<template>
  <div
    class="hidden md:flex justify-between items-center h-[75px] bg-charade-950 dark:bg-charade-900 max-w-[1350px] w-[95%] rounded-2xl mx-auto mt-2 z-10 relative"
  >
    <div class="flex justify-between items-center w-full">
      <!-- Display the logo if available -->
      <NuxtLinkLocale to="/">
        <img v-if="logo" :src="logo" alt="Gamma" class="h-12 w-[150px] ml-5" />
      </NuxtLinkLocale>
      <SearchBar />
      <div class="flex items-center">
        <Cart class="mr-4" />
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

if (logoData?.value?.Logo?.length > 0) {
  logo.value = `${config.public.baseURL}/${logoData.value.Logo[0].signedPath}`;
} else {
  console.error("Logo data is not available or in an unexpected format");
}

if (error.value) {
  console.error("Error fetching logo:", error.value);
}

const isModalVisible = ref(false);

function toggleModal() {
  isModalVisible.value = !isModalVisible.value;
}
</script>
