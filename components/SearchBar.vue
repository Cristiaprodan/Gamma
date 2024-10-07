<template>
  <div>
    <div
      class="flex items-center justify-center bg-white/10 rounded-xl px-4 py-3 cursor-pointer w-[300px] lg:w-[400px] transition-colors hover:bg-white/20"
      @click="toggleModal"
    >
      <UIcon
        size="25"
        class="text-white/50 mr-2"
        name="i-ph:magnifying-glass"
      />
      <input
        type="text"
        :placeholder="t('Search products...')"
        class="bg-transparent outline-none placeholder-white/50 w-full"
        readonly
      />
    </div>
    <SearchModal :isOpen="isModalVisible" :onClose="toggleModal" />
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const isModalVisible = ref(false);

function toggleModal() {
  isModalVisible.value = !isModalVisible.value;
  console.log("Modal visibility toggled:", isModalVisible.value);
}
</script>
