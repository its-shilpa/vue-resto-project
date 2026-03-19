<template>
  <div class="users-page">
    <!-- Hero -->
    <section class="users-hero">
      <div class="users-hero-bg"></div>
      <div class="users-hero-content" data-aos="fade-down" data-aos-duration="800">
        <h1 class="users-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          Online Users
        </h1>
        <p class="users-subtitle">Real-time view of currently active users on the platform</p>
        <div class="users-stat" v-if="users.length">
          <span class="stat-pulse"></span>
          <span>{{ users.filter(u => u.isLoggedIn).length }} currently online</span>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="users-content page-container">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading users...</p>
      </div>

      <!-- Users Grid -->
      <div class="users-grid" v-if="!loading && users.length" data-aos="fade-up">
        <div v-for="user in users" :key="user.id" class="user-card" :class="{ 'is-online': user.isLoggedIn }">
          <div class="user-avatar" :class="user.role">
            {{ user.name ? user.name[0].toUpperCase() : '?' }}
          </div>
          <div class="user-info">
            <h3 class="user-name">{{ user.name || 'Unknown' }}</h3>
            <p class="user-email">{{ user.email }}</p>
          </div>
          <div class="user-meta">
            <span class="role-tag" :class="user.role">
              <svg v-if="user.role === 'admin'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              {{ user.role }}
            </span>
            <span class="status-tag" :class="{ online: user.isLoggedIn }">
              <span class="status-dot"></span>
              {{ user.isLoggedIn ? 'Online' : 'Offline' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-if="!loading && users.length === 0" class="empty-state">
        <div class="empty-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <p>No users found</p>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "LoggedInUsers",
  data() {
    return {
      users: [],
      loading: false,
      interval: null
    };
  },
  methods: {
    async getUsers() {
      this.loading = true;
      try {
        const result = await API.get("/users");
        this.users = result.data;
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getUsers();
    this.interval = setInterval(() => {
      this.getUsers();
    }, 10000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
/* Hero */
.users-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 40px 24px;
  overflow: hidden;
}

.users-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.2), transparent 60%);
}

.users-hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.users-title {
  font-size: 28px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.users-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.users-stat {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #34d399;
}

.stat-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-green 2s ease-in-out infinite;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}

/* Content */
.users-content {
  padding: 28px 0 48px;
}

/* Loading */
.loading-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-muted);
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--primary-light);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Grid */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.user-card {
  background: white;
  border-radius: 14px;
  border: 1px solid var(--border);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.user-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.user-card.is-online {
  border-left: 3px solid #10b981;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.user-avatar.admin {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.user-email {
  font-size: 13px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.role-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.role-tag.admin {
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
}

.role-tag.user {
  background: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
}

.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.status-tag.online {
  color: #10b981;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--text-muted);
}

.status-tag.online .status-dot {
  background: #10b981;
  animation: pulse-green 2s ease-in-out infinite;
}

/* Empty */
.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: var(--bg-card-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  color: var(--text-muted);
}

.empty-state p {
  color: var(--text-muted);
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .users-hero {
    padding: 32px 16px;
  }

  .users-title {
    font-size: 22px;
  }

  .users-content {
    padding: 20px 0 40px;
  }

  .users-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .users-title {
    font-size: 20px;
  }

  .user-card {
    padding: 16px;
  }

  .user-meta {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 4px;
  }
}
</style>