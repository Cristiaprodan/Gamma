<template>
  <div class="relative">
    <!-- Button to toggle dropdown -->
    <button
      class="bg-accent px-4 flex py-2 items-center w-[300px] justify-center gap-5"
      @click="toggleDropdown"
    >
      <UIcon name="i-ph:dots-nine-bold" class="mr-2" size="23" />
      <p>{{ t("Toate categoriile") }}</p>
      <UIcon name="i-ph:caret-down-bold" class="ml-2" size="20" />
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isDropdownOpen"
      class="absolute dark:bg-charade-950 bg-white border rounded-b-xl border-accent dark:border-accentz-10 w-[300px] overflow-hidden z-50"
    >
      <ul class="categories">
        <!-- Iterate over all categories -->
        <li
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-2 dark:hover:bg-gray-500 hover:bg-gray-100 flex items-center justify-between relative"
        >
          <!-- Display Category -->
          <div class="flex items-center">
            <UIcon :name="`i-ph:${category.icon}`" class="mr-2" />
            {{ getCategoryName(category) }}
          </div>
          <UIcon name="i-ph:caret-right" class="ml-2" size="20" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";

const { t, locale } = useI18n();
const categories = ref([]);
const isDropdownOpen = ref(false);

// Fetch categories from your API
onMounted(async () => {
  try {
    const { data } = await axios.get("/api/getCategories");
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

// Toggle the dropdown open/close
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Get the appropriate category name based on the current language
function getCategoryName(category) {
  return locale.value === "ru" ? category.nameRu : category.nameRo;
}
</script>
