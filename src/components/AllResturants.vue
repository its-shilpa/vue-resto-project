<template>
  <div class="all-restaurants-page">
    <!-- Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="banner-content" data-aos="fade-down" data-aos-duration="1000">
        <h1 class="banner-title">All <span class="banner-highlight">Restaurants</span></h1>
        <p class="banner-subtitle">Browse our complete collection of restaurants</p>
        <div class="banner-search">
          <svg class="banner-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="search" placeholder="Search by name or location..." />
        </div>
        <div class="banner-stats">
          <div class="banner-stat">
            <span class="banner-stat-num">{{ filteredRestaurants.length }}</span>
            <span class="banner-stat-label">Results</span>
          </div>
          <div class="banner-stat-divider"></div>
          <div class="banner-stat">
            <span class="banner-stat-num">{{ totalPages }}</span>
            <span class="banner-stat-label">Pages</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="content-section page-container">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading restaurants...</p>
      </div>

      <p v-if="error" class="error-msg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        {{ error }}
      </p>

      <!-- Empty -->
      <div v-if="!loading && filteredRestaurants.length === 0 && !error" class="empty-state">
        <div class="empty-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40">
            <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>
        <h3>No restaurants found</h3>
        <p>Try adjusting your search terms</p>
      </div>

      <!-- Cards -->
      <div class="restaurant-grid" v-if="!loading && filteredRestaurants.length">
        <div
          v-for="(item, index) in paginatedRestaurants"
          :key="item.id"
          class="restaurant-card"
          data-aos="fade-up"
          :data-aos-delay="index * 80"
          @click="$router.push({ name: 'RestaurantDetails', params: { id: item.id } })"
        >
          <div
            class="card-image"
            :style="{
              backgroundImage: item.image
                ? `url(${item.image})`
                : `url(https://via.placeholder.com/400x300?text=No+Image)`,
            }"
          >
            <div class="card-image-overlay"></div>
          </div>
          <div class="restaurant-info">
            <h3 class="restaurant-name" v-html="highlight(item.name)"></h3>
            <div class="restaurant-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span v-html="highlight(item.address)"></span>
            </div>
            <div class="restaurant-detail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{{ item.contact }}</span>
            </div>
          </div>
        </div>
      </div>


      <!-- Pagination -->
      <div v-if="!loading && totalPages > 1" class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1" class="page-btn page-btn-nav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
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

        <button @click="currentPage++" :disabled="currentPage === totalPages" class="page-btn page-btn-nav">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
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
      perPage: 12,
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
      return text.replace(regex, `<span class="search-highlight">$1</span>`);
    },
  },

  computed: {
    filteredRestaurants() {
      return this.restaurants.filter(
        (item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.address.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    paginatedRestaurants() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredRestaurants.slice(start, end);
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
/* ===== Banner ===== */
.page-banner {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  padding: 44px 24px 44px;
  overflow: hidden;
}

.banner-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 20%, rgba(59, 130, 246, 0.2), transparent 60%),
    radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1), transparent 50%);
}

.banner-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.banner-title {
  font-size: 34px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.banner-highlight {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.banner-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

.banner-search {
  position: relative;
  max-width: 520px;
  margin: 0 auto 24px;
}

.banner-search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.banner-search input {
  width: 100%;
  height: 50px;
  padding: 0 20px 0 50px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
}

.banner-search input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.banner-search input:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.banner-stats {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.banner-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.banner-stat-num {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.banner-stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.banner-stat-divider {
  width: 1px;
  height: 28px;
  background: rgba(255, 255, 255, 0.15);
}

/* ===== Content ===== */
.content-section {
  padding: 40px 0 60px;
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
  border-top-color: var(--primary-light);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
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
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.1);
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

/* ===== Cards ===== */
.restaurant-grid {
  position: relative;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.restaurant-card {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 18px;
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  cursor: pointer;
}

.restaurant-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.25), transparent 60%);
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.restaurant-card:hover::before {
  opacity: 1;
}

.restaurant-card:hover {
  transform: translateY(-10px) scale(1.01);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 50px rgba(30, 64, 175, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.25);
}

.card-image {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #e2e8f0;
  position: relative;
  transition: transform 0.5s ease, filter 0.5s ease;
  overflow: hidden;
}

.restaurant-card:hover .card-image {
  transform: scale(1.08);
  filter: saturate(1.05) contrast(1.05);
}

.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.35) 75%, rgba(0, 0, 0, 0.55) 100%);
}

.restaurant-info {
  padding: 20px;
}

.restaurant-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.restaurant-detail {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
}

.restaurant-detail svg {
  flex-shrink: 0;
  color: var(--text-muted);
  margin-top: 1px;
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
  background: var(--bg-card-alt);
  border-color: var(--primary-light);
  color: var(--primary-light);
}

.page-btn.active {
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.3);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn-nav {
  padding: 0;
}

/* Search highlight */
.search-highlight {
  background: rgba(251, 191, 36, 0.3);
  padding: 0 2px;
  border-radius: 3px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .page-banner {
    padding: 32px 20px 36px;
  }
  .banner-title {
    font-size: 26px;
  }
  .banner-subtitle {
    font-size: 14px;
  }
  .banner-search input {
    height: 46px;
    font-size: 13px;
  }
  .banner-stats {
    gap: 14px;
    padding: 10px 20px;
  }
  .banner-stat-num {
    font-size: 17px;
  }
  .content-section {
    padding: 30px 0 50px;
  }
  .restaurant-grid {
    padding: 16px;
    border-radius: 20px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }
  .card-image {
    height: 160px;
  }
  .restaurant-info {
    padding: 16px;
  }
  .restaurant-name {
    font-size: 15px;
    margin-bottom: 10px;
  }
  .page-btn {
    min-width: 36px;
    height: 36px;
    font-size: 12px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .page-banner {
    padding: 24px 16px 28px;
  }
  .banner-title {
    font-size: 22px;
  }
  .banner-subtitle {
    font-size: 13px;
    margin-bottom: 18px;
  }
  .banner-search input {
    height: 44px;
    border-radius: 12px;
    padding: 0 16px 0 44px;
  }
  .banner-stats {
    gap: 12px;
    padding: 10px 16px;
    border-radius: 10px;
  }
  .banner-stat-num {
    font-size: 16px;
  }
  .banner-stat-label {
    font-size: 10px;
  }
  .content-section {
    padding: 24px 0 40px;
  }
  .restaurant-grid {
    padding: 12px;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .card-image {
    height: 180px;
  }
  .restaurant-info {
    padding: 14px;
  }
  .pagination {
    margin-top: 20px;
  }
  .page-btn {
    min-width: 34px;
    height: 34px;
    font-size: 12px;
  }
}
</style>
