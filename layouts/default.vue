<template>
  <div>
    <HeaderDesktop class="fixed" />
    <HeaderMobile class="fixed" />
    <Subheader />
    <div class="h-[1px] w-full bg-gray-200 dark:bg-gray-700 hidden md:block" />
    <div class="max-w-[1250px] w-[90%] mx-auto justify-center">
      <NuxtPage />
      <BeforeFooter />
    </div>
    <BottomBar class="fixed z-10" />
    <Footer />
  </div>
</template>
