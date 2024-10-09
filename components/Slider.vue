<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router"; // Import to detect the current route
import { useAsyncData } from "#imports";

const items = ref([]); // Array to store slider images
const carouselRef = ref();
const route = useRoute(); // Access the current route

// Function to display appropriate slider based on locale
const displaySliders = (sliderData, locale) => {
  const slider = sliderData[0]; // Assuming there's only one slider set in the response
  if (locale === "ru") {
    items.value = slider.Bannere_Slider_RU_; // Set RU slider images
  } else {
    items.value = slider.Bannere_Slider_RO_; // Set RO slider images
  }
};

// Fetch all sliders and display the appropriate one based on locale
const fetchSliders = async () => {
  // Fetch all sliders in one call
  const { data, error } = await useAsyncData("marketingDesign", () =>
    $fetch(`/api/marketingDesign`)
  );

  if (data?.value && data.value.success) {
    // Determine initial locale from the path
    const locale = route.fullPath.includes("/ru") ? "ru" : "ro";

    // Display appropriate sliders based on the detected locale
    displaySliders(data.value.data, locale);
  } else {
    console.error(
      "Error fetching sliders:",
      error?.value || "No sliders available"
    );
  }
};

// Watch for locale changes in the URL and display the appropriate sliders
watch(
  () => route.fullPath, // Watch for changes in the full path (which includes the locale)
  (newPath) => {
    const locale = newPath.includes("/ru") ? "ru" : "ro"; // Determine locale from the path
    // Refetch or update displayed sliders on route change
    fetchSliders();
  },
  { immediate: true } // Fetch immediately on page load
);

onMounted(() => {
  // Start by fetching the slider data and display based on the locale
  fetchSliders();

  // Setup auto-sliding every 5 seconds
  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 5000);
});
</script>

<template>
  <div>
    <!-- Carousel when data is loaded -->
    <UCarousel
      ref="carouselRef"
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'basis-full' }"
      class="rounded-lg overflow-hidden cursor-grab w-full h-[250px] md:h-[350px] lg:h-[515px]"
      indicators
    >
      <img
        :src="item"
        class="h-[250px] md:h-[350px] lg:h-[515px] w-full object-cover"
        draggable="false"
      />
    </UCarousel>
  </div>
</template>
