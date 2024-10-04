import ro from "./locales/ro.json";
import ru from "./locales/ru.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ro",
  messages: {
    ro,
    ru,
  },
}));
