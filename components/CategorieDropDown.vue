<template>
  <div class="relative hidden lg:block">
    <!-- Button to toggle dropdown -->
    <button
      :class="{ 'cursor-default': isHomePage, 'cursor-pointer': !isHomePage }"
      class="bg-accent px-4 flex py-2 items-center w-[315px] justify-between gap-5"
      @click="toggleDropdown"
    >
      <UIcon name="i-ph:dots-nine-bold" class="mr-2" size="23" />
      <p>{{ t("Toate categoriile") }}</p>
      <UIcon name="i-ph:caret-down-bold" class="ml-2" size="20" />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute dark:bg-charade-950 bg-white border rounded-b-xl border-accent dark:border-accentz-10 w-[315px] overflow-hidden z-50"
    >
      <ul class="categories">
        <!-- Iterate over all categories -->
        <li
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-[6px] dark:hover:bg-gray-500 hover:bg-gray-100 flex items-center justify-between relative"
        >
          <!-- Display Category -->
          <div class="flex items-center">
            <UIcon :name="`i-ph:${category.icon}`" size="23" class="mr-4" />
            {{ getCategoryName(category) }}
          </div>
          <UIcon name="i-ph:caret-right" class="ml-2" size="20" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router"; // Import Vue Router to access the current route and watch for route changes
import axios from "axios";

const { t, locale } = useI18n();
const categories = ref([]);
const isDropdownOpen = ref(false);
const isHomePage = ref(false);
// Get the current route
const route = useRoute();
const router = useRouter();

// Fetch categories from your API
onMounted(async () => {
  try {
    const { data } = await axios.get("/api/getCategories");
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Check if the route is "/" or "/ru" and open the dropdown by default
  if (route.path === "/" || route.path === "/ru") {
    isDropdownOpen.value = true;
    isHomePage.value = true; // Set isHomePage to true
  }
});

// Watch for route changes and close the dropdown if not on the home page
watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/" || newPath === "/ru") {
      isDropdownOpen.value = true;
      isHomePage.value = true; // Set isHomePage to true
    } else {
      isDropdownOpen.value = false;
      isHomePage.value = false; // Set isHomePage to false
    }
  }
);

// Toggle the dropdown open/close manually, but prevent closing on the home page
function toggleDropdown() {
  // Only toggle if not on the home page
  if (route.path !== "/" && route.path !== "/ru") {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
}

// Get the appropriate category name based on the current language
function getCategoryName(category) {
  return locale.value === "ru" ? category.nameRu : category.nameRo;
}
</script>
