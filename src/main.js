import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);

app.mount("#app");

AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out"
});

createApp(App).use(router).mount('#app')
