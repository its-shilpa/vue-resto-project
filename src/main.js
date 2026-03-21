import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-out-cubic",
  offset: 50,
});

createApp(App).use(router).mount('#app')

