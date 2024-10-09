<template>
  <div>
    <h1>{{ categoryId }}</h1>
    <!-- Your template content -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { t } = useI18n();

const categoryId = route.params.id;
// Fetch or do something with the categoryId, localized if necessary
</script>
