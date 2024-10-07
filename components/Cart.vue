<script setup lang="ts">
import { ref } from "vue";
const isOpen = ref(false);
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div>
    <!-- Shopping cart icon with badge that triggers the slide-over -->
    <div
      class="relative flex items-center justify-center cursor-pointer"
      @click="isOpen = true"
    >
      <UIcon size="30" name="i-ph:shopping-cart" class="text-white" />
      <span
        class="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
      >
        2
      </span>
    </div>

    <!-- Slide-over component -->
    <USlideover v-model="isOpen">
      <div class="flex flex-col h-full p-4 bg-white dark:bg-charade-800">
        <!-- Close button inside the slide-over -->
        <UButton
          color="gray"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark-20-solid"
          class="self-end mb-4"
          square
          padded
          @click="isOpen = false"
        />
        <!-- Content inside the slide-over -->
        <div class="flex-1 flex items-center justify-center">
          <!-- Empty content, you can customize as needed -->
          <p class="text-center text-gray-500">{{ t("Cart is empty") }}</p>
        </div>
      </div>
    </USlideover>
  </div>
</template>
