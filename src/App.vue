<template>
  <div id="app-root">
    <Headrsec v-if="showLayout" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="showLayout" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Headrsec from "./components/Headrsec.vue";
import AppFooter from "./components/FooterSec.vue";
import AOS from "aos";
export default {
  name: "App",
  components: {
    Headrsec,
    AppFooter
  },
  mounted() {
    this.$router.afterEach(() => {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    });
  },
  setup() {
    const route = useRoute();

    const showLayout = computed(() => {
      return !["Login", "SignUp"].includes(route.name);
    });

    return { showLayout };
  }
};
</script>

<style>
/* ===== Google Font ===== */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* ===== CSS Reset & Variables ===== */
:root {
  /* Primary palette */
  --primary: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  --primary-gradient: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);

  /* Accent */
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --accent-dark: #d97706;

  /* Success / Danger */
  --success: #10b981;
  --success-light: #34d399;
  --danger: #ef4444;
  --danger-light: #f87171;

  /* Neutrals */
  --bg-page: #f0f4f8;
  --bg-card: #ffffff;
  --bg-card-alt: #f8fafc;
  --border: #e2e8f0;
  --border-focus: #3b82f6;

  /* Text */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --text-white: #ffffff;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 40px rgba(0,0,0,0.12);
  --shadow-card: 0 4px 20px rgba(30,64,175,0.08);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;

  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background: var(--bg-page);
  line-height: 1.6;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Global 90% page container */
.page-container {
  width: 90%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: var(--primary-light);
  text-decoration: none;
  transition: var(--transition);
}

a:hover {
  color: var(--primary);
}

/* ===== Global Form Styles ===== */
.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}

.login,
.register,
.resto-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login input,
.register input,
.resto-form input {
  width: 100%;
  max-width: 360px;
  height: 48px;
  padding: 0 16px;
  margin-bottom: 16px;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: var(--text-primary);
  background: var(--bg-card);
  transition: var(--transition);
  outline: none;
}

.login input:focus,
.register input:focus,
.resto-form input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.login input::placeholder,
.register input::placeholder,
.resto-form input::placeholder {
  color: var(--text-muted);
}

.primary-btn {
  width: 100%;
  max-width: 360px;
  height: 48px;
  background: var(--primary-gradient);
  border: none;
  color: var(--text-white);
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.primary-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 100%);
  opacity: 0;
  transition: var(--transition);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(30, 64, 175, 0.35);
}

.primary-btn:hover::before {
  opacity: 1;
}

.primary-btn:active {
  transform: translateY(0);
}

.addresto {
  margin-top: 40px;
}

/* ===== Responsive ===== */
@media (max-width: 480px) {
  .login input,
  .register input,
  .resto-form input {
    max-width: 100%;
    height: 44px;
    font-size: 14px;
  }

  .primary-btn {
    max-width: 100%;
    height: 44px;
    font-size: 14px;
  }
}

/* ===== Global Swiper Navigation ===== */
.swiper-button-next,
.swiper-button-prev {
  width: 40px !important;
  height: 40px !important;
  background: rgba(59, 130, 246, 0.08) !important;
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(59, 130, 246, 0.25) !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.08);
  color: var(--primary-light) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.25s ease !important;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background: linear-gradient(135deg, #1e40af, #3b82f6) !important;
  color: white !important;
  border-color: transparent !important;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
  transform: scale(1.1);
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 13px !important;
  font-weight: 700 !important;
}

.swiper-pagination-bullet {
  background: var(--text-muted) !important;
  opacity: 0.35 !important;
  transition: all 0.25s ease;
}

.swiper-pagination-bullet-active {
  background: var(--primary-light) !important;
  opacity: 1 !important;
  transform: scale(1.2);
}

.swiper-button-prev, .swiper-button-next {
svg {
    width: 50% !important;
    height: 50% !important;
}
}


/* Animation css */
.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}
</style>
