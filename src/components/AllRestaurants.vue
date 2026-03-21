<template>
  <div class="all-resto-page">
    <!-- Hero Banner with Food BG -->
    <section class="resto-hero">
      <div
        class="resto-hero-bg"
        style="
          background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg');
        "
      ></div>
      <div class="resto-hero-overlay"></div>
      <div class="resto-hero-content" data-aos="fade-down" data-aos-duration="1000">
        <span class="resto-hero-badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="14"
            height="14"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {{ filteredRestaurants.length }} Restaurants Near You
        </span>
        <h1>
          Find Your Perfect<br /><span class="hero-accent"> Dining Spot</span>
        </h1>
        <p>Explore our curated list of top-rated restaurants</p>
        <div class="resto-search-bar">
          <svg
            class="resto-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="20"
            height="20"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="search"
            placeholder="Search restaurants, locations..."
          />
          <button class="search-btn" v-if="search" @click="search = ''">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="resto-content page-container">
      <!-- Toolbar -->
      <div class="resto-toolbar" data-aos="fade-up">
        <div class="resto-toolbar-left">
          <div class="toolbar-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="18"
              height="18"
            >
              <path
                d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
              />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div class="toolbar-text">
            <span class="toolbar-count">{{ filteredRestaurants.length }}</span>
            <span class="toolbar-label"> Restaurants Found</span>
          </div>
        </div>
        <div class="toolbar-page-badge">
          Page <span>{{ currentPage }}</span> /
          <span>{{ totalPages || 1 }}</span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Finding restaurants...</p>
      </div>

      <p v-if="error" class="error-msg">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          width="18"
          height="18"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        {{ error }}
      </p>

      <!-- Empty -->
      <div
        v-if="!loading && filteredRestaurants.length === 0 && !error"
        class="empty-state"
      >
        <div class="empty-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="40"
            height="40"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3>No restaurants found</h3>
        <p>Try adjusting your search terms</p>
      </div>

      <!-- Cards – Magazine Style -->
      <div
        class="resto-grid"
        v-if="!loading && filteredRestaurants.length"
      >
        <div
          v-for="(item, index) in paginatedRestaurants"
          :key="item.id"
          class="resto-card"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
          @click="
            $router.push({ name: 'RestaurantDetails', params: { id: item.id } })
          "
        >
            <div
              class="resto-card-bg"
              :style="{
                backgroundImage: item.image
                  ? `url(${item.image})`
                  : `url(https://via.placeholder.com/400x300?text=No+Image)`,
              }"
            ></div>
            <div class="resto-card-overlay"></div>
            <div class="resto-card-inner">
              <span class="resto-card-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="12"
                  height="12"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span v-html="highlight(item.address)"></span>
              </span>
              <h3 v-html="highlight(item.name)"></h3>
              <div class="resto-card-bottom">
                <span class="resto-card-contact">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    width="13"
                    height="13"
                  >
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                    />
                  </svg>
                  {{ item.contact }}
                </span>
                <span class="resto-card-arrow">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    width="18"
                    height="18"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </div>
            </div>
        </div>

      </div>

      <!-- Pagination -->
      <div v-if="!loading && totalPages > 1" class="pagination">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="page-btn page-btn-nav"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="16"
            height="16"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="['page-btn', { active: currentPage === page }]"
        >
          {{ page }}
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="page-btn page-btn-nav"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="16"
            height="16"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "AllRestaurants",
  data() {
    return {
      restaurants: [],
      loading: false,
      error: null,
      search: "",
      currentPage: 1,
      perPage: 8,
    };
  },

  async mounted() {
    this.getRestaurants();
  },

  methods: {
    async getRestaurants() {
      this.loading = true;
      this.error = null;
      try {
        const result = await API.get("/resturent");
        this.restaurants = result.data;
      } catch (err) {
        this.error = "Failed to load restaurants. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    highlight(text) {
      if (!text) return "";
      if (!this.search) return text;
      const regex = new RegExp(`(${this.search})`, "gi");
      return text.replace(regex, `<span class="search-hl">$1</span>`);
    },
  },

  computed: {
    filteredRestaurants() {
      return this.restaurants.filter(
        (item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.address.toLowerCase().includes(this.search.toLowerCase()),
      );
    },

    paginatedRestaurants() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredRestaurants.slice(start, start + this.perPage);
    },

    totalPages() {
      return Math.ceil(this.filteredRestaurants.length / this.perPage);
    },
  },

  watch: {
    search() {
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
/* ===== Hero Banner ===== */
.resto-hero {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.resto-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.35) saturate(1.3);
  transform: scale(1.05);
}

.resto-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.5) 0%,
    rgba(15, 23, 42, 0.7) 60%,
    rgba(15, 23, 42, 0.95) 100%
  );
}

.resto-hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 48px 24px;
  max-width: 640px;
}

.resto-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.resto-hero-badge svg {
  color: #fbbf24;
}

.resto-hero-content h1 {
  font-size: 38px;
  font-weight: 800;
  color: white;
  line-height: 1.15;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.hero-accent {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.resto-hero-content p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 28px;
}

.resto-search-bar {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
}

.resto-search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.35);
  pointer-events: none;
}

.resto-search-bar input {
  width: 100%;
  height: 52px;
  padding: 0 48px 0 50px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
}

.resto-search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.resto-search-bar input:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
}

.search-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* ===== Content ===== */
.resto-content {
  padding: 32px 0 60px;
}

/* Toolbar */
.resto-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding: 16px 22px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.resto-toolbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.toolbar-icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.15),
    rgba(217, 119, 6, 0.1)
  );
  border: 1px solid rgba(245, 158, 11, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbbf24;
}

.toolbar-text {
  /* display: flex; */
  flex-direction: column;
  gap: 2px;
}

.toolbar-count {
  font-size: 20px;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.toolbar-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-left: 5px;
}

.toolbar-page-badge {
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.toolbar-page-badge span {
  color: #fbbf24;
  font-weight: 700;
}

/* Loading */
.loading-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: #f59e0b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Error */
.error-msg {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 12px;
  color: var(--danger);
  font-size: 14px;
  max-width: 500px;
  margin: 0 auto;
}

/* Empty */
.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.08),
    rgba(217, 119, 6, 0.12)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.12);
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.empty-state p {
  font-size: 14px;
  color: var(--text-muted);
}

/* ===== Magazine Cards ===== */
.resto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.resto-card {
  position: relative;
  height: 340px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.resto-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease, filter 0.6s ease;
}

.resto-card:hover .resto-card-bg {
  transform: scale(1.1);
  filter: brightness(0.9) saturate(1.2);
}

.resto-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0.7) 75%,
    rgba(0, 0, 0, 0.9) 100%
  );
  transition: background 0.4s ease;
}

.resto-card:hover .resto-card-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.6) 65%,
    rgba(0, 0, 0, 0.92) 100%
  );
}

.resto-card:hover {
  transform: translateY(-6px);
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
}

.resto-card-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transform: translateY(8px);
  transition: transform 0.4s ease;
}

.resto-card:hover .resto-card-inner {
  transform: translateY(0);
}

.resto-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  width: fit-content;
}

.resto-card-tag svg {
  color: #fbbf24;
  flex-shrink: 0;
}

.resto-card-inner h3 {
  font-size: 22px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.3px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.resto-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.resto-card-contact {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.resto-card-contact svg {
  color: #fbbf24;
  opacity: 0.8;
}

.resto-card-arrow {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-8px);
}

.resto-card:hover .resto-card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.resto-card-arrow:hover {
  background: #d97706;
  transform: scale(1.1);
}

/* Search highlight */
:deep(.search-hl) {
  background: rgba(251, 191, 36, 0.35);
  padding: 0 3px;
  border-radius: 3px;
  color: #fef3c7;
  font-weight: 700;
}

/* ===== Pagination ===== */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 36px;
}

.page-btn {
  min-width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(245, 158, 11, 0.06);
  border-color: rgba(245, 158, 11, 0.3);
  color: #d97706;
}

.page-btn.active {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.35);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn-nav {
  padding: 0;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .resto-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .resto-hero {
    min-height: 280px;
  }
  .resto-hero-content {
    padding: 36px 20px;
  }
  .resto-hero-content h1 {
    font-size: 28px;
  }
  .resto-hero-content p {
    font-size: 14px;
  }
  .resto-search-bar input {
    height: 46px;
    font-size: 14px;
  }
  .resto-content {
    padding: 24px 0 50px;
  }
  .resto-toolbar {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
  .resto-card {
    height: 300px;
  }
  .resto-card-inner h3 {
    font-size: 18px;
  }
  .page-btn {
    min-width: 36px;
    height: 36px;
    font-size: 12px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .resto-hero {
    min-height: 260px;
  }
  .resto-hero-content {
    padding: 28px 16px;
  }
  .resto-hero-content h1 {
    font-size: 24px;
    br {
      display: none;
    }
  }
  .resto-hero-content p {
    font-size: 13px;
    margin-bottom: 20px;
  }
  .resto-hero-badge {
    font-size: 11px;
    padding: 5px 12px;
  }
  .resto-search-bar input {
    height: 44px;
    font-size: 13px;
    border-radius: 12px;
    padding: 0 44px 0 44px;
  }
  .resto-content {
    padding: 20px 0 40px;
  }
  .resto-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .resto-card {
    height: 280px;
  }
  .resto-card-inner {
    padding: 18px;
  }
  .resto-card-inner h3 {
    font-size: 18px;
  }
  .pagination {
    margin-top: 24px;
  }
  .page-btn {
    min-width: 34px;
    height: 34px;
  }
}
</style>
