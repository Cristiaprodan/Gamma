<template>
  <div>
    <!-- Background Overlay for Blur and Dark Effect -->
    <div
      v-if="isExpanded || isListOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-5"
      @click="handleClickOutside"
    ></div>

    <!-- Bottom Bar -->
    <div
      :class="{
        'md:hidden z-10 flex justify-center fixed bottom-0 w-full bg-charade-900 backdrop-blur-sm rounded-t-3xl transition-all duration-300': true,
        'h-[70px]': !isExpanded,
        'h-[85vh]': isExpanded,
      }"
      ref="bottomBar"
    >
      <div class="flex items-end justify-between w-[90%] px-5 h-full pb-5">
        <UIcon size="33" name="i-ph:phone" class="text-white" />

        <UIcon
          size="33"
          name="i-ph:magnifying-glass"
          class="text-white"
          @click="toggleModal"
        />
        <!-- Search Modal -->
        <SearchModal :isOpen="isModalVisible" :onClose="toggleModal" />

        <UIcon
          :size="isExpanded ? '39' : '33'"
          name="i-ph:dots-nine-bold"
          :class="{
            ' transition-transform duration-300': true,
            'text-white scale-130': isExpanded,
            'text-accent': !isExpanded,
          }"
          @click="toggleExpand"
        />
        <Cart />
        <UIcon
          size="33"
          name="i-ph:list"
          class="text-white"
          @click="toggleList"
        />
      </div>
    </div>

    <!-- Sidebar List -->
    <div
      :class="{
        'md:hidden z-2 fixed bottom-0 w-[50%] h-[100vh] bg-white dark:bg-charade-950 right-0 border-l border-accent flex-auto flex flex-col items-center justify-start  transition-transform duration-300 ease-in-out': true,
        'translate-x-0': isListOpen,
        'translate-x-full': !isListOpen,
      }"
      ref="sideList"
    >
      <div class="mt-20">
        <DarkModeSwitcher class="mt-10" />
        <Menu vertical class="mt-20" gapSize="20px" />
        <LangSwitcher class="mt-20" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      isListOpen: false,
      isModalVisible: false, // Move isModalVisible here
    };
  },
  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      this.setupClickOutsideHandler();
    },
    toggleList() {
      this.isListOpen = !this.isListOpen;
      this.setupClickOutsideHandler();
    },
    setupClickOutsideHandler() {
      if (this.isExpanded || this.isListOpen) {
        document.addEventListener("mousedown", this.handleClickOutside);
      } else {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      const bottomBar = this.$refs.bottomBar;
      const sideList = this.$refs.sideList;

      // Close if click is outside the bottom bar or the sidebar list
      if (
        bottomBar &&
        !bottomBar.contains(event.target) &&
        (!sideList || !sideList.contains(event.target))
      ) {
        this.isExpanded = false;
        this.isListOpen = false;
        document.removeEventListener("mousedown", this.handleClickOutside); // Clean up listener
      }
    },
  },
  watch: {
    isExpanded(newVal) {
      if (!newVal) {
        this.isListOpen = false; // Close the sidebar when the bottom bar is collapsed
      }
    },
  },
  mounted() {
    // Ensure the click outside handler is cleaned up when the component is destroyed
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
};
</script>
