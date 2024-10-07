<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center h-screen"
    >
      <div
        ref="modalRef"
        class="bg-white w-[85%] min-w-[60%] dark:bg-charade-900 max-w-4xl rounded-lg shadow-lg p-10 relative"
      >
        <div class="flex items-center mb-6">
          <UIcon
            size="24"
            name="i-ph:magnifying-glass"
            class="text-primary dark:text-white mr-2"
          />
          <input
            type="text"
            :placeholder="t('Search products...')"
            v-model="searchTerm"
            class="flex-grow bg-transparent outline-none text-primary dark:text-white text-xl placeholder-primary/50 dark:placeholder-white/50"
            autofocus
          />
          <button
            @click="onClose"
            class="text-primary dark:text-white hover:text-accent dark:hover:text-accent transition-colors"
          >
            <UIcon size="24" name="i-ph:x-circle" />
          </button>
        </div>
        <div class="text-primary dark:text-white">
          <p>{{ t("Search results") }}: {{ searchTerm }}</p>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { onUnmounted, ref, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const searchTerm = ref("");
const modalRef = ref(null);

// Handle clicking outside of the modal to close
const handleClickOutside = (event) => {
  if (modalRef.value && !modalRef.value.contains(event.target)) {
    props.onClose();
  }
};

// Watch for modal open state and attach/remove event listener
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset"; // Re-enable background scroll
    }
  }
);

onUnmounted(() => {
  // Clean up event listener when component unmounts
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>
