<template>
  <div
    class="md:hidden flex justify-between items-center w-full h-[77px] border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-charade-950/80 backdrop-filter backdrop-blur-lg px-3 z-10 sticky top-0"
  >
    <!-- Logo: dark and light mode switch -->
    <NuxtLinkLocale to="/">
      <div class="h-12 w-[150px] ml-5">
        <img
          v-if="blackLogo && lightLogo"
          :src="themeStore.isDarkMode ? lightLogo : blackLogo"
          alt="Gamma"
          class="h-full w-full"
        />
      </div>
    </NuxtLinkLocale>

    <div class="flex items-center gap-5">
      <UIcon size="30" name="i-ph:user" class="mr-2" />
      <DarkModeSwitcher />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";
import DarkModeSwitcher from "./DarkModeSwitcher.vue";

// References for logos
const blackLogo = ref(null);
const lightLogo = ref(null);

// Access the theme store
const themeStore = useThemeStore();

// Function to fetch logo data from API
const fetchLogoData = async () => {
  try {
    const response = await fetch("/api/marketingDesign");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const logoData = await response.json();

    if (logoData.success && logoData.data.length > 0) {
      const marketingData = logoData.data[0]; // Access the first record
      blackLogo.value = marketingData.Logo_Black[0]; // Set the black logo for light mode
      lightLogo.value = marketingData.Logo[0]; // Set the light logo for dark mode

      // Store logos in localStorage for persistence
      localStorage.setItem("blackLogo", blackLogo.value);
      localStorage.setItem("lightLogo", lightLogo.value);

      console.log("Fetched and stored logos:", {
        lightLogo: lightLogo.value,
        blackLogo: blackLogo.value,
      });
    } else {
      console.warn("Logo data not successful or empty:", logoData);
    }
  } catch (error) {
    console.error("Error fetching logo:", error);
  }
};

onMounted(() => {
  // Load the saved theme (dark or light)
  themeStore.loadSavedTheme();

  // Retrieve logos from localStorage if available
  const storedBlackLogo = localStorage.getItem("blackLogo");
  const storedLightLogo = localStorage.getItem("lightLogo");

  if (storedBlackLogo && storedLightLogo) {
    blackLogo.value = storedBlackLogo;
    lightLogo.value = storedLightLogo;
    console.log("Loaded logos from localStorage:", {
      lightLogo: lightLogo.value,
      blackLogo: blackLogo.value,
    });
  } else {
    // If not in localStorage, fetch from API
    fetchLogoData();
  }

  console.log("Is Dark Mode:", themeStore.isDarkMode);
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>
