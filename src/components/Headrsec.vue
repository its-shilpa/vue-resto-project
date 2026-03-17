<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo-area">
        <div class="logo-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        </div>
        <span class="logo-text">RestroHub</span>
      </router-link>

      <!-- Hamburger -->
      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ active: menuOpen }" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Nav -->
      <nav class="nav" :class="{ open: menuOpen }">
        <router-link to="/" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Home
        </router-link>
        <router-link to="/all-restaurants" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
          Restaurants
        </router-link>
        <router-link v-if="isAdmin" to="/users-list" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          Users
        </router-link>
        <router-link v-if="isLoggedIn" to="/profile" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          Profile
        </router-link>
        <router-link v-if="isLoggedIn" to="/favorites" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          My Favourite
        </router-link>
        <router-link v-if="isAdmin" to="/admin-dashboard" class="nav-link" @click="menuOpen = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </router-link>
        <a @click="logout" href="#" class="nav-link nav-link--logout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
import AuthService from "@/services/authService";

export default {
  name: "HeaderSec",
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user");
    },
    isAdmin() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "admin";
    }
  },
  methods: {
    async logout() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        await AuthService.logout(user.id);
      }
      this.menuOpen = false;
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 30px rgba(15, 23, 42, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.logo-area:hover {
  opacity: 0.9;
}

.logo-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.3px;
}

/* Navigation */
.nav {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13.5px;
  font-weight: 500;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
}

.nav-link svg {
  opacity: 0.7;
  flex-shrink: 0;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.nav-link:hover svg {
  opacity: 1;
}

.nav-link.router-link-active {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.nav-link.router-link-active svg {
  opacity: 1;
  color: #93c5fd;
}

.nav-link--logout:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.nav-link--logout:hover svg {
  color: #fca5a5;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  padding: 0;
}

.hamburger:hover {
  background: rgba(255, 255, 255, 0.12);
}

.hamburger span {
  display: block;
  width: 18px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ===== Mobile ===== */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%);
    flex-direction: column;
    padding: 8px 12px 16px;
    gap: 2px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  }

  .nav.open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .nav-link {
    width: 100%;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 14px;
  }
}

@media (max-width: 360px) {
  .logo-text {
    font-size: 1.05rem;
  }

  .logo-icon-wrap {
    width: 34px;
    height: 34px;
  }
}
</style>
