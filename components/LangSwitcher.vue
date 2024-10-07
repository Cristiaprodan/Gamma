<template>
  <div class="cursor-pointer">
    <div class="cursor-pointer flex items-center">
      <select
        v-model="selectedLocale"
        @change="switchLocale(selectedLocale)"
        class="bg-transparent border-none custom-select"
      >
        <option
          v-for="locale in locales"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
      <UIcon size="22" name="i-ph:caret-down" />
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale, setLocale } = useI18n();
const selectedLocale = locale;
const locales = [
  { code: "ro", name: "Română" },
  { code: "ru", name: "Русский" },
];

// Function to switch the locale
function switchLocale(lang) {
  setLocale(lang);
}
</script>

<style scoped>
.custom-select {
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  appearance: none; /* Standard */
}

.custom-select:focus {
  outline: none;
  border-color: #888;
}
</style>
