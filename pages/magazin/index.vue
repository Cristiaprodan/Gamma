<template>
  <div>
    <h1>Main Categories</h1>
    <table>
      <thead>
        <tr>
          <th v-for="(value, key) in categories[0]" :key="key">{{ key }}</th>
          <!-- Display table headers -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.Id">
          <td v-for="(value, key) in category" :key="key">{{ value }}</td>
          <!-- Display each field's value -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFetch } from "#imports";

const categories = ref([]);

// Fetch data from API for categories
const { data, error } = await useFetch("/api/getCategories");

if (data.value) {
  categories.value = data.value.categories; // Only categories data is used
}

if (error.value) {
  console.error("Error fetching categories:", error.value);
}
</script>
