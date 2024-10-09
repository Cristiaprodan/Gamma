<script setup>
const { t } = useI18n();

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  gapSize: {
    type: String,
    default: "10px", // Default gap size
  },
});
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      gap: gapSize,
    }"
  >
    <NuxtLinkLocale
      to="magazin-reduceri"
      class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
      active-class="hovered-accent"
    >
      {{ t("reduceri") }}
    </NuxtLinkLocale>

    <NuxtLinkLocale
      to="magazin"
      class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
      active-class="hovered-accent"
    >
      {{ t("magazin") }}
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="livrare"
      class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
      active-class="hovered-accent"
    >
      {{ t("livrare") }}
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="despre-noi"
      class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
      active-class="hovered-accent"
    >
      {{ t("despre noi") }}
    </NuxtLinkLocale>

    <NuxtLinkLocale
      to="contacte"
      class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
      active-class="hovered-accent"
    >
      {{ t("contacte") }}
    </NuxtLinkLocale>
  </div>
</template>

<style scoped>
.hovered-accent {
  @apply text-accent dark:text-accent;
}
</style>
