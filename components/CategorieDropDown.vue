<template>
  <div class="relative hidden lg:block">
    <!-- Button to toggle dropdown -->
    <button
      :class="{ 'cursor-default': isHomePage, 'cursor-pointer': !isHomePage }"
      class="bg-accent px-4 flex py-2 items-center w-[315px] justify-between gap-5"
      @click="toggleDropdown"
    >
      <UIcon name="i-ph:dots-nine-bold" class="mr-2" size="23" />
      <p>{{ t('Toate categoriile') }}</p>
      <UIcon name="i-ph:caret-down-bold" class="ml-2" size="20" />
    </button>

    <!-- Dropdown menu with transition -->
    <transition name="fade">
      <div
        v-if="isDropdownOpen"
        class="dropdown-menu absolute flex dark:bg-charade-950 bg-white border rounded-b-xl border-accent dark:border-accentz-10 overflow-hidden z-10"
        :style="{
          width: hoveredCategoryId ? '90vw' : '315px',
          maxWidth: hoveredCategoryId ? '1250px' : '315px',
          height: `${dropdownHeight}px`,
          opacity: dropdownOpacity,
        }"
        @mouseleave="hoveredCategoryId = null"
      >
        <ul class="categories w-[314px]">
          <!-- Iterate over all categories -->
          <li
            v-for="category in categories"
            :key="category.id"
            :class="{
              'bg-hovered-category': hoveredCategoryId === category.id, // Custom class for hovered category
              'dark:hover:bg-[#4A4B59] hover:bg-gray-100':
                hoveredCategoryId !== category.id,
            }"
            class="px-4 py-[6px] cursor-pointer flex items-center justify-between relative"
            @mouseenter="hoveredCategoryId = category.id"
          >
            <NuxtLink
              :to="
                localePath({
                  name: 'categoria-id',
                  params: { id: createSlug(category) }, // Use only Nume_Categorie_RO to create the slug
                })
              "
              class="flex justify-between w-full"
              active-class="hovered-accent"
            >
              <div class="flex items-center">
                <UIcon
                  :name="`i-ph:${category.Icons}`"
                  size="23"
                  class="mr-4"
                />
                {{ getCategoryName(category) }}
              </div>
              <UIcon name="i-ph:caret-right" class="ml-2" size="20" />
            </NuxtLink>
          </li>
        </ul>
        <!-- Pass the hovered category ID to SubCategoriesDropdown -->
        <SubcategoriesDropdown
          :categoryId="hoveredCategoryId"
          :categorySlug="
            hoveredCategoryId ? createSlug(getHoveredCategory()) : ''
          "
          class="w-[calc(100%-314px)]"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import slugify from 'slugify';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const categories = ref([]);
const isDropdownOpen = ref(false);
const isHomePage = ref(false);
const dropdownHeight = ref(0);
const dropdownOpacity = ref(0); // To handle smooth opacity transitions
const route = useRoute();
const router = useRouter();
const hoveredCategoryId = ref(null);

// Function to fetch categories immediately during load
const fetchCategories = async () => {
  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    categories.value = data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const getHoveredCategory = () => {
  return categories.value.find(
    (category) => category.id === hoveredCategoryId.value
  );
};
// Function to calculate the height of the dropdown
const calculateDropdownHeight = () => {
  const dropdownMenu = document.querySelector('.categories');
  if (dropdownMenu) {
    dropdownHeight.value = dropdownMenu.scrollHeight;
  }
};

// Function to toggle the dropdown open/close with animation
const toggleDropdown = () => {
  // Allow toggling if it's not the homepage
  if (!isHomePage.value) {
    if (isDropdownOpen.value) {
      dropdownHeight.value = 0;
      dropdownOpacity.value = 0;
      isDropdownOpen.value = false; // Immediate close
    } else {
      isDropdownOpen.value = true;
      nextTick(() => {
        calculateDropdownHeight();
        dropdownOpacity.value = 1; // Smooth opacity transition
      });
    }
  }
};

// Watch for locale changes and adjust the URL slug
watch(locale, (newLocale) => {
  const categoryId = route.params.id;
  const category = categories.value.find(
    (cat) => createSlug(cat) === categoryId
  );

  if (category) {
    const newSlug = createSlug(category); // Always use Nume_Categorie_RO
    if (categoryId !== newSlug) {
      router.push({
        name: 'categoria-id',
        params: { id: newSlug },
      });
    }
  }
});

// On component mount
onMounted(async () => {
  await fetchCategories();

  if (route.path === '/' || route.path === '/ru') {
    isHomePage.value = true; // Mark as homepage
    isDropdownOpen.value = true; // Open dropdown by default on homepage
    nextTick(() => {
      calculateDropdownHeight();
      dropdownOpacity.value = 1; // Ensure smooth animation
    });
  } else {
    isHomePage.value = false;
    isDropdownOpen.value = false; // Close the dropdown if not on the homepage
  }
});

// Watch for route changes and adjust dropdown
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/' || newPath === '/ru') {
      isHomePage.value = true;
      isDropdownOpen.value = true; // Always open on homepage
      nextTick(() => {
        calculateDropdownHeight();
        dropdownOpacity.value = 1;
      });
    } else {
      isHomePage.value = false;
      // Close dropdown immediately without transition on route change
      dropdownHeight.value = 0; // Reset height immediately
      dropdownOpacity.value = 0; // Reset opacity immediately
      isDropdownOpen.value = false; // Close without animation
    }
  }
);

// Get the appropriate category name based on the current language
const getCategoryName = (category) => {
  return locale.value === 'ru'
    ? category.Nume_Categorie_RU
    : category.Nume_Categorie_RO;
};

// Use the `slugify` package to create a slug for the URL using only Nume_Categorie_RO
const createSlug = (category) => {
  return (
    slugify(category.Nume_Categorie_RO, {
      replacement: '-', // Replace spaces with hyphens
      lower: true, // Convert the text to lowercase
      strict: true, // Remove special characters
    }).toLowerCase() +
    '_' +
    category.id
  ); // Force everything to be lowercase
};
</script>

<style scoped>
/* Ensure there is no transition during route changes */
.dropdown-menu {
  transition: none !important; /* Disable all transitions */
}
.bg-hovered-category {
  background-color: #f0f0f0; /* Change to your desired hover color */
}

.dark .bg-hovered-category {
  background-color: #4a4b59; /* Dark mode hover background */
}
</style>
