<script setup>
const { t } = useI18n();
</script>

<template>
  <div class="flex w-[500px] gap-4">
    <NuxtLinkLocale
      to="magazin-reduceri"
      class="mr-2 dark:text-charade-300 text-charade-700 dark:hover:text-accent hover:text-accent"
      active-class="text-accent dark:text-accent"
    >
      {{ t("reduceri") }}
    </NuxtLinkLocale>

    <NuxtLinkLocale
      to="magazin"
      class="mr-2 dark:text-charade-300 text-charade-700 dark:hover:text-accent hover:text-accent"
      active-class="text-accent dark:text-accent"
    >
      {{ t("magazin") }}
    </NuxtLinkLocale>

    <NuxtLinkLocale
      to="despre-noi"
      class="mr-2 dark:text-charade-300 text-charade-700 dark:hover:text-accent hover:text-accent"
      active-class="text-accent dark:text-accent"
    >
      {{ t("despre noi") }}
    </NuxtLinkLocale>

    <NuxtLinkLocale
      to="contacte"
      class="mr-2 dark:text-charade-300 text-charade-700 dark:hover:text-accent hover:text-accent"
      active-class="text-accent dark:text-accent"
    >
      {{ t("contacte") }}
    </NuxtLinkLocale>
  </div>
</template>
