<template>
  <div
    class="product-card border hover:border-accent border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden dark:hover:border-accent hover:cursor-pointer relative"
  >
    <UIcon name="i-ph:heart-fill" size="25" class="absolute top-2 left-2" />
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-40 object-contain drop-shadow-2xl drop-shadow-img-product"
    />
    <div v-if="isFiftyPercentOff" class="badge">{{ t("50% off") }}</div>
    <div class="p-4">
      <div class="flex-col justify-between items-center">
        <h2 class="text-lg font-semibold mb-3">{{ product.name }}</h2>
        <div class="flex mb-3 gap-4 justify-between">
          <span
            :class="{ 'strikethrough text-gray-500': product.discount }"
            class="text-lg font"
          >
            {{ product.price }} mdl
          </span>
          <span
            v-if="product.discount"
            class="text-lg font-semibold text-red-500"
          >
            {{ product.discount }} mdl
          </span>
        </div>
      </div>
      <div class="flex justify-center items-center">
        <button
          class="bg-gray-500 hover:bg-charade-900 py-[2px] text-white text-sm font-semibold px-4 rounded-lg hover:bg-accent-dark flex items-center justify-center content-center w-full"
        >
          {{ t("buy now")
          }}<UIcon name="i-ph:cursor-click" size="30" class="ml-2" />
        </button>

        <UIcon
          name="i-ph:shopping-cart"
          size="35"
          class="ml-2 hover:text-accent"
          @click="addToCart(product)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const product = ref({
  image:
    "https://gallerypng.com/wp-content/uploads/2024/08/black-iphone-png-photo.png",
  name: "Iphone 15",
  price: 350,
  discount: 170,
});

const addToCart = (product) => {
  console.log("Product added to cart:", product);
};

const isFiftyPercentOff = computed(() => {
  const originalPrice = parseFloat(product.value.price);
  const discountPrice = parseFloat(product.value.discount);
  return (originalPrice - discountPrice) / originalPrice >= 0.5;
});
</script>

<style scoped>
.product-card {
  max-width: 270px;
  position: relative;
}
.drop-shadow-img-product {
  filter: drop-shadow(0px 0px 5px #393942);
}
.strikethrough {
  position: relative;
  display: inline-block;
}

.strikethrough::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: gray;
  transform: rotate(-10deg);
  transform-origin: center;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
}
</style>
