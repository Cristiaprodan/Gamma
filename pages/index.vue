<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";

const { t, locale } = useI18n();
const banner3Url = ref(null);

async function fetchBanner3() {
  try {
    const response = await fetch("/api/marketingDesign");
    const data = await response.json();
    if (data.success && data.data.length > 0) {
      // Determine which banner to use based on the locale
      if (locale.value === "ro") {
        banner3Url.value = data.data[0].Banner3_RO_[0];
      } else if (locale.value === "ru") {
        banner3Url.value = data.data[0].Banner3_RU_[0];
      }
    }
  } catch (error) {
    console.error("Error fetching Banner3 data:", error);
  }
}

onMounted(() => {
  fetchBanner3();
});
</script>

<template>
  <div>
    <div class="w-full flex mt-5">
      <div class="hidden lg:block w-[460px]"></div>
      <div class="w-full">
        <Slider />
      </div>
    </div>
    <TopCategory class="self-center" />
    <DiscoutedProducts />
    <BestSelling class="mt-10" />
    <Featured class="mt-10" />
    <div class="rounded-2xl overflow-hidden mt-10">
      <img
        :src="banner3Url"
        alt="Gamma"
        v-if="banner3Url"
        class="h-[200px] object-cover w-full md:h-[260px]"
      />
    </div>
  </div>
</template>
