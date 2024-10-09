<template>
  <div
    class="items-center md:w-full mt-10 mb-12 w-[100vw] ml-[-5vw] md:ml-0 md:mr-0"
  >
    <div class="flex mb-10 justify-center">
      <h1 class="text-4xl font-bold text-center">{{ t("Top Categories") }}</h1>
    </div>
    <div
      class="flex gap-5 overflow-x-auto lg:overflow-x-hidden lg:justify-center"
    >
      <div
        class="flex p-4 justify-between cursor-pointer dark:bg-charade-800 border border-charade-900 hover:border-accent bg-charade-950 w-[350px] h-[110px] rounded-xl shrink-0 m-1"
      >
        <div>
          <p class="text-white text-sm mb-2">{{ t("Category") }}</p>
          <p class="text-white text-xl mb-2">Categorie name</p>
          <div class="w-20 h-[1px] bg-white"></div>
        </div>
        <img
          src="https://via.placeholder.com/150"
          alt="Categorie name"
          class="w-20 h-20 rounded-lg"
        />
      </div>
      <div
        class="flex p-4 justify-between cursor-pointer dark:bg-charade-800 border border-charade-900 hover:border-accent bg-charade-950 w-[350px] h-[110px] rounded-xl shrink-0 m-1"
      >
        <div>
          <p class="text-white text-sm mb-2">{{ t("Category") }}</p>
          <p class="text-white text-xl mb-2">Categorie name</p>
          <div class="w-20 h-[1px] bg-white"></div>
        </div>
        <img
          src="https://via.placeholder.com/150"
          alt="Categorie name"
          class="w-20 h-20 rounded-lg"
        />
      </div>
      <div
        class="flex p-4 justify-between cursor-pointer dark:bg-charade-800 border border-charade-900 hover:border-accent bg-charade-950 w-[350px] h-[110px] rounded-xl shrink-0 m-1"
      >
        <div>
          <p class="text-white text-sm mb-2">{{ t("Category") }}</p>
          <p class="text-white text-xl mb-2">Categorie name</p>
          <div class="w-20 h-[1px] bg-white"></div>
        </div>
        <img
          src="https://via.placeholder.com/150"
          alt="Categorie name"
          class="w-20 h-20 rounded-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style scoped>
@media only screen and (max-width: 767px) {
  .screenfullphone {
    width: 100vw;
  }
}

/* For tablet devices (768px to 1024px wide) */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .screenfulltablet {
    width: 100vw;
  }
}
</style>
