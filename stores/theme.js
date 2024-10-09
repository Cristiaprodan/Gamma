export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.updateDarkMode();
    },
    updateDarkMode() {
      if (this.isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    },
    loadSavedTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (
        savedTheme === "dark" ||
        (!savedTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        this.isDarkMode = true;
        document.documentElement.classList.add("dark");
      } else {
        this.isDarkMode = false;
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
