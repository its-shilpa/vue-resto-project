import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-in-out",
  offset: 80,
});

createApp(App).use(router).mount('#app')

