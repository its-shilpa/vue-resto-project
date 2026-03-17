<template>
  <div class="profile-page">
    <!-- Hero -->
    <section class="profile-hero">
      <div class="profile-hero-bg"></div>
      <div class="profile-hero-content">
        <div class="avatar-ring">
          <div class="avatar">
            <span>{{ initials }}</span>
          </div>
        </div>
        <div class="profile-hero-info">
          <h1>{{ userData.name || "User" }}</h1>
          <p class="hero-email">{{ userData.email }}</p>
          <div class="hero-badges">
            <div class="role-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="12"
                height="12"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {{ userData.role || "user" }}
            </div>
            <div class="status-badge">
              <span class="status-dot"></span>
              Active
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="profile-content page-container">
      <div class="profile-card" v-if="!isEditing">
        <div class="card-header">
          <h2>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="20"
              height="20"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Personal Information
          </h2>
          <button class="edit-btn" @click="isEditing = true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="14"
              height="14"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="18"
                height="18"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div class="info-text">
              <span class="info-label">Full Name</span>
              <span class="info-value">{{ userData.name }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon email-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="18"
                height="18"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div class="info-text">
              <span class="info-label">Email Address</span>
              <span class="info-value">{{ userData.email }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon role-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="18"
                height="18"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div class="info-text">
              <span class="info-label">Role</span>
              <span class="info-value capitalize">{{ userData.role }}</span>
            </div>
          </div>
          <div class="info-item">
            <div class="info-icon status-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="18"
                height="18"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div class="info-text">
              <span class="info-label">Account Status</span>
              <span class="info-value"
                ><span class="status-dot-sm"></span> Active</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div class="profile-card" v-if="isEditing">
        <div class="card-header">
          <h2>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="20"
              height="20"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </h2>
        </div>
        <div class="edit-form">
          <div class="input-group">
            <label>Full Name</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                v-model="editData.name"
                type="text"
                placeholder="Enter your name"
              />
            </div>
          </div>
          <div class="input-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                v-model="editData.email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div class="input-group">
            <label>New Password</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input
                v-model="editData.password"
                type="password"
                placeholder="Leave empty to keep current"
              />
            </div>
          </div>
          <div class="form-actions">
            <button class="save-btn" @click="saveProfile">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="16"
                height="16"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Save Changes
            </button>
            <button class="cancel-btn" @click="cancelEdit">Cancel</button>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "ProfilePage",
  data() {
    return {
      userData: {},
      isEditing: false,
      allRestaurants: [],
      editData: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    initials() {
      const name = this.userData.name || "";
      return name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    },
    favoriteRestaurants() {
      if (!this.userData?.favorites?.length) return [];

      return this.allRestaurants.filter((r) =>
        this.userData.favorites.includes(r.id),
      );
    },
  },
  methods: {
    async loadRestaurants() {
      const res = await API.get("/resturent");
      this.allRestaurants = res.data;
    },

    async removeFavorite(id) {
      const updatedFavorites = this.userData.favorites.filter(
        (favId) => favId !== id,
      );

      await API.patch(`/users/${this.userData.id}`, {
        favorites: updatedFavorites,
      });

      this.userData.favorites = updatedFavorites;
      localStorage.setItem("user", JSON.stringify(this.userData));
    },

    goToDetails(id) {
      this.$router.push(`/restaurant/${id}`);
    },

    loadUser() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.userData = user;
        this.editData.name = user.name;
        this.editData.email = user.email;
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editData.name = this.userData.name;
      this.editData.email = this.userData.email;
      this.editData.password = "";
    },
    async saveProfile() {
      try {
        const updatePayload = {
          name: this.editData.name,
          email: this.editData.email,
        };

        if (this.editData.password) {
          updatePayload.password = this.editData.password;
        }

        const res = await API.patch(
          `/users/${this.userData.id}`,
          updatePayload,
        );

        const updatedUser = { ...this.userData, ...res.data };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        this.userData = updatedUser;
        this.isEditing = false;
        this.editData.password = "";
      } catch (error) {
        console.error("Update failed:", error);
        alert("Failed to update profile.");
      }
    },
  },
  mounted() {
    this.loadUser();
    this.loadRestaurants();
  },
};
</script>

<style scoped>
/* ===== Hero ===== */
.profile-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  padding: 56px 24px 80px;
  overflow: hidden;
}

.profile-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 70% 20%,
      rgba(59, 130, 246, 0.25),
      transparent 50%
    ),
    radial-gradient(
      circle at 30% 80%,
      rgba(99, 102, 241, 0.15),
      transparent 50%
    );
}

.profile-hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 28px;
}

.avatar-ring {
  padding: 4px;
  border-radius: 24px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
  flex-shrink: 0;
}

.avatar {
  width: 88px;
  height: 88px;
  border-radius: 20px;
  background: linear-gradient(135deg, #1e3a8a, #1e40af);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 800;
  color: white;
  border: 3px solid rgba(15, 23, 42, 0.5);
}

.profile-hero-info h1 {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
  letter-spacing: -0.3px;
}

.hero-email {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.hero-badges {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #93c5fd;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #6ee7b7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
}

/* ===== Content Section ===== */
.profile-content {
  position: relative;
  padding-bottom: 48px;
  margin-top: -44px;
}

.profile-card {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.08),
    0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background: rgba(248, 250, 252, 0.6);
}

.card-header h2 {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-header h2 svg {
  color: #3b82f6;
}

.edit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(99, 102, 241, 0.1)
  );
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.edit-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.18),
    rgba(99, 102, 241, 0.18)
  );
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* ===== Info Grid ===== */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.info-item {
  padding: 22px 28px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  border-right: 1px solid rgba(226, 232, 240, 0.6);
  transition: background 0.2s ease;
}

.info-item:hover {
  background: rgba(59, 130, 246, 0.02);
}

.info-item:nth-child(2n) {
  border-right: none;
}

.info-item:nth-last-child(-n + 2) {
  border-bottom: none;
}

.info-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.1),
    rgba(99, 102, 241, 0.08)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #3b82f6;
}

.info-icon.email-icon {
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1),
    rgba(251, 191, 36, 0.08)
  );
  color: #f59e0b;
}

.info-icon.role-icon {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(167, 139, 250, 0.08)
  );
  color: #8b5cf6;
}

.info-icon.status-icon {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(52, 211, 153, 0.08)
  );
  color: #10b981;
}

.info-text {
  flex: 1;
  min-width: 0;
}

.info-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
  word-break: break-all;
}

.capitalize {
  text-transform: capitalize;
}

.status-dot-sm {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-dot 2s ease-in-out infinite;
}

/* ===== Edit Form ===== */
.edit-form {
  padding: 28px;
}

.input-group {
  margin-bottom: 22px;
}

.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  pointer-events: none;
  transition: color 0.25s ease;
}

.input-wrapper input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 44px;
  border: 2px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: rgba(248, 250, 252, 0.6);
  transition: all 0.25s ease;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.input-wrapper input:focus + .input-icon,
.input-wrapper:focus-within .input-icon {
  color: #3b82f6;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.save-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 28px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(30, 64, 175, 0.35);
}

.cancel-btn {
  padding: 13px 28px;
  background: white;
  color: var(--text-secondary);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .profile-hero {
    padding: 40px 16px 72px;
  }

  .profile-hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-badges {
    justify-content: center;
  }

  .profile-hero-info h1 {
    font-size: 24px;
  }

  .profile-content {
    padding: 0 16px 40px;
    margin-top: -40px;
  }

  .profile-card {
    border-radius: 16px;
  }

  .card-header {
    padding: 18px 20px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .info-item {
    border-right: none;
    padding: 18px 20px;
  }

  .info-item:nth-last-child(-n + 2) {
    border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .edit-form {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column;
  }

  .save-btn,
  .cancel-btn {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .profile-hero {
    padding: 32px 16px 64px;
  }

  .avatar-ring {
    padding: 3px;
    border-radius: 18px;
  }

  .avatar {
    width: 72px;
    height: 72px;
    font-size: 24px;
    border-radius: 16px;
  }

  .profile-hero-info h1 {
    font-size: 20px;
  }

  .hero-email {
    font-size: 13px;
  }

  .hero-badges {
    flex-wrap: wrap;
    gap: 8px;
  }

  .profile-content {
    margin-top: -36px;
  }

  .info-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }

  .info-icon svg {
    width: 16px;
    height: 16px;
  }

  .edit-form {
    padding: 18px 16px;
  }

  .input-wrapper input {
    height: 44px;
  }
}

/* ===== Favorites ===== */
.favorite-card {
  margin-top: 24px;
}

.favorite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  padding: 24px;
}

.favorite-item {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 18px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: all 0.35s ease;
  cursor: pointer;
  position: relative;
}

.favorite-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(30, 64, 175, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.favorite-item::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.2), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
  z-index: 1;
}

.favorite-item:hover::before {
  opacity: 1;
}

.favorite-item::after {
  content: "View Details →";
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 14px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  color: #3b82f6;
  opacity: 0;
  transform: translateY(-6px);
  transition: all 0.3s ease;
  z-index: 2;
}

.favorite-item:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.favorite-item img {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.favorite-item:hover img {
  transform: scale(1.06);
}

.favorite-info {
  padding: 18px 20px;
}

.favorite-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.favorite-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 14px;
}

.remove-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: rgba(239, 68, 68, 0.06);
  border: 1.5px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.25s ease;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
}
</style>
