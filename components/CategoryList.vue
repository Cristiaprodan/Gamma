<template>
  <!-- Category List (shown when no category is selected) -->
  <div v-if="!selectedCategory">
    <h2 class="text-2xl font-semibold mb-4">
      {{ $t('Toate Categoriiile') }}
    </h2>
    <ul>
      <li
        v-for="category in categories"
        :key="category.id"
        class="flex gap-2 my-2 justify-between items-center"
      >
        <!-- Nuxt link to category URL -->
        <nuxt-link
          :to="`/categoria/${createSlug(category.Nume_Categorie_RO)}`"
          class="text-xl flex items-center gap-5"
        >
          <UIcon :name="`i-ph:${category.Icons}`" size="30" />
          {{ getCategoryName(category) }}
        </nuxt-link>

        <!-- Caret Icon to load subcategories -->
        <UIcon
          name="i-ph:caret-right"
          class="cursor-pointer"
          size="23"
          @click="fetchSubcategories(category)"
        />
      </li>
    </ul>
  </div>

  <!-- Subcategory List (shown when a category is selected) -->
  <div v-else>
    <!-- Back Button -->
    <button
      @click="goBack"
      class="mb-4 hover:underline flex items-center gap-2"
    >
      <UIcon name="i-ph:caret-left" size="23" />
      <p class="text-xl">{{ $t('inapoi') }}</p>
    </button>

    <!-- Subcategories Section -->
    <div class="gap-4 p-2 w-full overflow-y-auto">
      <!-- Individual Subcategory Blocks -->
      <div
        v-for="subcategory in subcategories"
        :key="subcategory.id"
        class="break-inside-avoid p-3 bg-[#3A3B4A] rounded-md mb-4"
      >
        <!-- Subcategory Title -->
        <h3 class="text-xl font-semibold">
          <NuxtLink
            :to="generateSubcategoryLink(subcategory)"
            class="cursor-pointer hover:text-accent"
          >
            {{ getSubcategoryName(subcategory) }}
          </NuxtLink>
        </h3>
        <div class="my-2">
          <NuxtLink
            :to="generateSubcategoryLink(subcategory)"
            class="block w-full"
          >
            <img
              v-if="subcategory.images && subcategory.images.length > 0"
              :src="subcategory.images[0]"
              :alt="getSubcategoryName(subcategory)"
              class="w-full h-48 object-cover rounded-md hover:opacity-80 transition-opacity"
            />
          </NuxtLink>
        </div>
        <!-- Subsubcategories List -->
        <ul>
          <li
            v-for="subsub in subcategory.subSubcategories"
            :key="subsub.id"
            class="text-base text-gray-300 my-1"
          >
            <NuxtLink
              :to="generateSubsubcategoryLink(subcategory, subsub)"
              class="cursor-pointer hover:text-accent"
            >
              {{ getSubsubName(subsub) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';
import { useI18n } from 'vue-i18n';
import slugify from 'slugify';

// Categories ref to store fetched data
const categories = ref([]);
const subcategories = ref([]);
const selectedCategory = ref(null);
const error = ref(null);

// Fetch the categories data from the API
const { data, pending, error: fetchError } = await useFetch('/api/categories');

// Once the data is available, update the categories ref
if (data.value && data.value.success) {
  categories.value = data.value.data;
}

// Get locale from vue-i18n
const { locale } = useI18n();

// Function to get category name based on locale
const getCategoryName = (category) => {
  return locale.value === 'ru'
    ? category.Nume_Categorie_RU
    : category.Nume_Categorie_RO;
};

// Function to create slug from the category name
const createSlug = (text) => {
  return slugify(text, {
    replacement: '-', // Replace spaces with hyphens
    lower: true, // Convert the text to lowercase
    strict: true, // Remove special characters
  }).toLowerCase();
};

// Fetch subcategories based on the selected category
const fetchSubcategories = async (category) => {
  selectedCategory.value = category; // Set the selected category

  const { data, error: fetchError } = await useFetch(
    `/api/subCategories?categoryId=${category.id}`
  );

  if (fetchError.value) {
    error.value = fetchError.value.message;
    subcategories.value = [];
  } else {
    subcategories.value = data.value?.data || [];
  }
};

// Go back to the category list
const goBack = () => {
  selectedCategory.value = null;
};

// Functions to handle subcategory names and links (same as in your first component)
const getSubcategoryName = (subcategory) => {
  return locale.value === 'ru'
    ? subcategory.subcategory_name_ru || 'Unnamed'
    : subcategory.subcategory_name_ro || 'Unnamed';
};

const getSubsubName = (subsub) => {
  return locale.value === 'ru'
    ? subsub.subsub_name_ru || 'Unnamed'
    : subsub.subsub_name_ro || 'Unnamed';
};

const generateSubcategoryLink = (subcategory) => {
  if (!selectedCategory.value || !subcategory) return ''; // Ensure non-empty values
  return `/categoria/${createSlug(
    selectedCategory.value.Nume_Categorie_RO
  )}/${createSlug(subcategory.subcategory_name_ro)}`;
};

const generateSubsubcategoryLink = (subcategory, subsub) => {
  if (!selectedCategory.value || !subcategory || !subsub) return ''; // Ensure all values exist
  return `/categoria/${createSlug(
    selectedCategory.value.Nume_Categorie_RO
  )}/${createSlug(subcategory.subcategory_name_ro)}/${createSlug(
    subsub.subsub_name_ro
  )}`;
};
</script>

<style scoped>
.columns-3 {
  column-count: 3;
  column-gap: 1rem;
}

.break-inside-avoid {
  break-inside: avoid;
  margin-bottom: 1rem;
}

.button {
  background-color: #38e991;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
</style>
