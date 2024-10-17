<template>
  <div>
    <h1>Category: {{ categoryId[0] }}</h1>
    <!-- Render subcategories -->
    <ul>
      <li v-for="subcategory in subcategories.data" class="border">
        <img :src="subcategory.images[0]" alt="" />
        <h1>{{ getSubCategoryName(subcategory) }}</h1>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const subcategories = ref([]);

// Get the first level categoryId from the route
const route = useRoute();
const categoryId = route.params.id.split('_');

const { data } = await useFetch(
  `/api/subCategories?categoryId=${categoryId[1]}`
);
subcategories.value = data.value;

const getSubCategoryName = (subcategory) => {
  return locale.value === 'ru'
    ? subcategory.subcategory_name_ru
    : subcategory.subcategory_name_ro;
};
</script>

<style scoped>
/* Add styles */
</style>
