<template>
  <div
    class="cursor-pointer dark:bg-accent bg-transparent rounded-full p-[3px] w-10 h-10 flex items-center justify-center"
    @click="toggleDarkMode"
  >
    <UIcon
      name="i-ph:sun"
      v-if="!isDarkMode"
      size="24"
      class="dark:text-white text-accent"
    />
    <UIcon name="i-ph:moon" v-else size="28" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

// Destructure the reactive state using storeToRefs
const { isDarkMode } = storeToRefs(themeStore);

// Directly call the toggleDarkMode method from the store
const toggleDarkMode = themeStore.toggleDarkMode;
</script>
