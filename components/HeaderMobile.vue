<template>
  <div
    class="md:hidden flex justify-between items-center w-full h-[70px] border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-charade-950/80 backdrop-filter backdrop-blur-lg px-3 z-3 relative"
  >
    <!-- Search Icon to open modal -->

    <!-- Logo: dark and light mode switch -->
    <NuxtLinkLocale to="/">
      <img
        :src="isDarkMode ? lightLogo : blackLogo"
        :alt="isDarkMode ? 'Gamma Light' : 'Gamma Black'"
        class="h-12 w-[150px] ml-5"
      />
    </NuxtLinkLocale>
    <div class="flex items-center gap-5">
      <UIcon size="30" name="i-ph:user" class="mr-2" />
      <UIcon size="30" name="i-ph:heart" class="mr-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAsyncData } from "#imports";
import { useRuntimeConfig } from "#imports";

// State for dark mode (switch logos)
const blackLogo = ref(null);
const lightLogo = ref(null);
const isDarkMode = ref(false);

// Toggle dark mode manually (localStorage)
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

// Load the stored theme from localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  isDarkMode.value = savedTheme === "dark";
  document.documentElement.classList.toggle("dark", isDarkMode.value);
};

// Modal state
const isModalVisible = ref(false);

// Toggle function for modal visibility
const toggleModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

onMounted(async () => {
  loadTheme();

  const { data: logoData, error } = await useAsyncData("getLogo", () =>
    $fetch("/api/getLogo")
  );
  const config = useRuntimeConfig();

  if (logoData?.value) {
    const blackLogoObject = logoData.value["Logo Black"]?.[0];
    const lightLogoObject = logoData.value["Logo"]?.[0];

    if (blackLogoObject) {
      blackLogo.value = `${config.public.baseURL}/${blackLogoObject.path}`;
      console.log("Black logo path set to:", blackLogo.value);
    } else {
      console.error(
        "Logo Black data is not available or in an unexpected format"
      );
    }

    if (lightLogoObject) {
      lightLogo.value = `${config.public.baseURL}/${lightLogoObject.path}`;
      console.log("Light logo path set to:", lightLogo.value);
    } else {
      console.error("Logo data is not available or in an unexpected format");
    }
  } else {
    console.error("Logo data is not available or in an unexpected format");
  }

  if (error?.value) {
    console.error("Error fetching logo:", error.value);
  }
});
</script>
