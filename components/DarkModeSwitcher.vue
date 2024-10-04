<template>
  <div
    class="cursor-pointer dark:bg-accent bg-transparent rounded-full p-[3px] w-10 h-10 flex items-center justify-center"
    @click="toggleDarkMode"
  >
    <UIcon
      name="i-ph:sun"
      v-if="!isDarkMode"
      size="24"
      class="dark:text-white text-white"
    />
    <UIcon name="i-ph:moon" v-else size="28" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(false);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateDarkMode();
}

function updateDarkMode() {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// On mounted, check the saved theme in localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>
