<template>
  <div
    class="hidden md:flex justify-between items-center h-[75px] bg-charade-950 dark:bg-charade-900 max-w-[1350px] w-[95%] rounded-2xl mx-auto mt-2 z-50 sticky top-3"
  >
    <div class="flex justify-between items-center w-full">
      <!-- Display the logo if available, else show skeleton -->
      <NuxtLinkLocale to="/">
        <div class="h-12 w-[150px] ml-5">
          <img v-if="logo" :src="logo" alt="Gamma" class="h-full w-full" />
        </div>
      </NuxtLinkLocale>
      <SearchBar />
      <div class="flex items-center">
        <Cart class="mr-4" />
        <UIcon size="26" name="i-ph:user" class="mr-3 text-white" />
        <NuxtLinkLocale to="/wishlist">
          <UIcon size="26" name="i-ph:heart-straight" class="mr-5 text-white" />
        </NuxtLinkLocale>
        <DarkModeSwitcher class="mr-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Use `useFetch` for both SSR and client-side rendering
const {
  data: logoData,
  pending,
  error,
} = await useFetch("/api/marketingDesign");

// Reference for logo
const logo = ref(null);

if (logoData.value?.success && logoData.value.data?.length) {
  const marketingData = logoData.value.data[0];
  logo.value = marketingData.Logo[0];
}

// Check for any errors and log them
if (error.value) {
  console.error("Error fetching logo:", error.value);
}
</script>
