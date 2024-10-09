<template>
  <div class="w-full bg-gray-200 dark:bg-charade-950">
    <div>
      <!-- Subscription Section -->
      <div class="bg-charade-950 dark:bg-charade-900 w-full">
        <div
          class="max-w-[1250px] w-[90%] mx-auto flex flex-col md:flex-row gap-4 py-5 justify-center items-center"
        >
          <UIcon name="i-ph:newspaper-light" class="text-white" size="55" />
          <div class="text-center md:text-left">
            <h2 class="text-xl font-bold text-white">
              {{ t("Obțineți 10% reducere") }}
            </h2>
            <p class="text-gray-500">
              {{
                t(
                  "Obțineți toate cele mai recente informații despre evenimente, vânzări și oferte"
                )
              }}
            </p>
          </div>
          <form
            @submit.prevent="submitForm"
            class="flex md:flex-row gap-2 flex-grow w-full lg:w-auto"
          >
            <input
              v-model="email"
              type="email"
              :placeholder="t('Introdu adresa ta de e-mail')"
              class="flex-grow text-white items-center justify-center bg-white/10 rounded-xl px-4 py-3 transition-colors hover:bg-white/20 focus:outline-none"
              required
            />
            <button type="submit" class="bg-accent rounded-lg p-2">
              {{ t("Abonați-vă") }}
            </button>
          </form>
        </div>
      </div>

      <!-- Main Footer Content -->
      <div
        class="max-w-[1250px] w-[90%] mx-auto justify-between my-10 flex flex-col md:flex-row"
      >
        <!-- Logo and Contact Info -->
        <div
          class="flex flex-col gap-4 justify-center items-center md:items-start md:w-1/3"
        >
          <NuxtLinkLocale to="/">
            <img
              :src="themeStore.isDarkMode ? lightLogo : blackLogo"
              alt="Gamma"
              class="h-12 w-[150px]"
            />
          </NuxtLinkLocale>
          <p class="text-gray-500 text-center md:text-left">
            {{
              t(
                "Tot ce cauți, într-un singur loc Descoperă posibilități nelimitate!"
              )
            }}
          </p>
          <!-- Contact Links -->
          <a href="tel:+40723456789" class="flex items-center gap-2">
            <div
              class="flex relative bg-accent p-2 rounded-full w-[40px] h-[40px] items-center justify-center"
            >
              <UIcon name="i-ph:phone-call" class="text-white" size="30" />
            </div>
            <p class="text-gray-500">+40 723 456 789</p>
          </a>
          <a href="mailto:support@gamma.md" class="flex items-center gap-2">
            <div
              class="flex bg-accent p-2 rounded-full w-[40px] h-[40px] items-center justify-center"
            >
              <UIcon name="i-ph:envelope" class="text-white" size="30" />
            </div>
            <p class="text-gray-500">support@gamma.md</p>
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Strada+Sfîntul+Gheorghe+6,+Chișinău,+Moldova"
            class="flex items-center gap-2"
          >
            <div
              class="flex bg-accent p-2 rounded-full w-[40px] h-[40px] items-center justify-center"
            >
              <UIcon name="i-ph:map-pin" class="text-white" size="30" />
            </div>
            <p class="text-gray-500">
              Strada Sfîntul Gheorghe 6, Chișinău, Moldova
            </p>
          </a>
        </div>

        <!-- Menu Footer (Visible on Large Screens) -->
        <div class="hidden lg:block">
          <h2 class="text-2xl font-bold mb-4 text-charade-950 dark:text-white">
            {{ t("Meniu") }}
          </h2>
          <MenuFooter vertical />
        </div>

        <!-- Customer Service Links -->
        <div class="hidden md:block">
          <h2 class="text-2xl font-bold mb-4 text-charade-950 dark:text-white">
            {{ t("Serviciul clientela") }}
          </h2>
          <div class="flex flex-col gap-2">
            <NuxtLinkLocale
              to="termeni-si-conditii"
              class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
              active-class="hovered-accent"
            >
              {{ t("Termeni și condiții") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="schimb-si-returnare"
              class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
              active-class="hovered-accent"
            >
              {{ t("Schimb și returnare") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="politica-de-confidentialitate"
              class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
              active-class="hovered-accent"
            >
              {{ t("Politica de confidentialitate") }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              to="garantie"
              class="mr-2 text-gray-500 dark:hover:text-accent hover:text-accent"
              active-class="hovered-accent"
            >
              {{ t("Garantie") }}
            </NuxtLinkLocale>
          </div>
        </div>

        <!-- Social Media and Mobile App Links -->
        <div class="text-center md:text-left my-8 md:my-0">
          <h2 class="text-xl font-bold mb-4 text-charade-950 dark:text-white">
            {{ t("Follow us") }}
          </h2>
          <div class="flex gap-2 w-full justify-center md:justify-start my-4">
            <UIcon name="i-ph:facebook-logo" class="text-gray-500" size="35" />
            <UIcon name="i-ph:instagram-logo" class="text-gray-500" size="35" />
          </div>
          <h2 class="text-xl font-bold mb-4 text-charade-950 dark:text-white">
            {{ t("Aplicație mobilă") }}
          </h2>
          <div
            class="flex w-full bg-charade-950 p-2 rounded-xl border-2 border-gray-500 items-center justify-center gap-2 mb-2"
          >
            <img src="assets/img/Apple.svg" alt="app-store" class="h-7" />
            <h3 class="text-white">{{ t("Descarcă pentru iphone") }}</h3>
          </div>
          <div
            class="flex w-full bg-charade-950 p-2 rounded-xl border-2 border-gray-500 items-center justify-center gap-2"
          >
            <img src="assets/img/Playstore.svg" alt="app-store" class="h-7" />
            <h3 class="text-white">{{ t("Descarcă pentru android") }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="bg-white dark:bg-gray-300 h-10 items-center flex">
      <div
        class="max-w-[1250px] w-[90%] mx-auto flex justify-between items-center"
      >
        <div class="flex items-center space-x-2 text-charade-950">
          <p class="text-sm">&copy;</p>
          <p class="font-bold">Gamma</p>
          <p class="text-sm text-gray-500">copyright 2024</p>
        </div>
        <div class="flex items-center space-x-4">
          <p class="text-sm text-gray-500">Modalități de plată</p>
          <div class="flex gap-2 h-10">
            <img src="assets/img/Payments.png" alt="payments" class="h-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";

// Initialize translation function
const { t } = useI18n();

// Email input reference
const email = ref("");

// Logo references
const blackLogo = ref(null);
const lightLogo = ref(null);

// Access the theme store
const themeStore = useThemeStore();

// Function to fetch logos
async function fetchLogos() {
  try {
    const response = await fetch("/api/marketingDesign");

    if (!response.ok) {
      throw new Error("Error fetching logo");
    }

    const logoData = await response.json();

    if (logoData.success && logoData.data?.length) {
      const marketingData = logoData.data[0];
      blackLogo.value = marketingData.Logo_Black[0];
      lightLogo.value = marketingData.Logo[0];

      // Save logos to sessionStorage
      sessionStorage.setItem("blackLogo", blackLogo.value);
      sessionStorage.setItem("lightLogo", lightLogo.value);
    }
  } catch (error) {
    console.error("Error fetching logos:", error);
  }
}

// Function to submit the email
async function submitForm() {
  if (!email.value) {
    console.error("Email is required");
    return;
  }

  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await response.json();

    if (data.success) {
      console.log("Email added successfully");
      email.value = "";
    } else {
      console.error("Failed to add email:", data.error);
    }
  } catch (error) {
    console.error("Error submitting email:", error);
  }
}

// Load logos from sessionStorage if available, otherwise fetch new ones
onMounted(() => {
  blackLogo.value = sessionStorage.getItem("blackLogo");
  lightLogo.value = sessionStorage.getItem("lightLogo");

  if (!blackLogo.value || !lightLogo.value) {
    fetchLogos();
  }
});
</script>

<style scoped>
.hovered-accent {
  @apply text-accent dark:text-accent;
}
</style>
