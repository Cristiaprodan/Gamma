<template>
  <div>
    <h1 class="text-3xl font-bold dark:text-white text-charade-900">
      {{ t("Garantie") }}
    </h1>
    <div class="text-base">
      <p class="mt-4">
        {{
          t(
            "Garanția la produsele vîndute de compania Gamma, prevede reparația gratuită sau înlocuirea lor cu altele similare, potrivit dispozițiilor legale în vigoare."
          )
        }}
      </p>

      <p class="mt-4">
        {{
          t(
            "2. Pentru a beneficia de garanție, trebuie să prezentați bonul fiscal sau factura în original și certificatul de garanție îndeplinit corect."
          )
        }}
      </p>

      <p class="mt-4">
        {{
          t(
            "3. Gamma se obligă să înlăture defecțiunile componentelor pe întreaga perioadă de garanție."
          )
        }}
      </p>

      <p class="mt-4">
        {{
          t(
            "5. Produsele defectate se prezintă în cutia originală cu setul complet de accesorii."
          )
        }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style scoped></style>
