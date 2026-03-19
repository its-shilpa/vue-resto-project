<template>
  <div class="dashboard-page">
    <!-- Header -->
    <section class="dash-hero">
      <div class="dash-hero-bg"></div>
      <div class="dash-hero-content">
        <div class="dash-hero-left">
          <h1 class="dash-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </h1>
          <p class="dash-subtitle">Hello <strong>{{ name }}</strong>, manage your restaurants below</p>
        </div>
        <router-link class="add-btn" to="/add-resturent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Restaurant
        </router-link>
      </div>
    </section>

    <!-- Content -->
    <section class="dash-content page-container">
      <!-- Stats -->
      <div class="stats-row" v-if="!loading">
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #60a5fa);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-num">{{ resturent.length }}</span>
            <span class="stat-label">Total Restaurants</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #34d399);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-num">{{ filteredRestaurants.length }}</span>
            <span class="stat-label">Filtered Results</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #fbbf24);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-num">{{ totalPages }}</span>
            <span class="stat-label">Total Pages</span>
          </div>
        </div>
      </div>

      <!-- Search & Table Card -->
      <div class="table-card">
        <div class="table-header">
          <h2 class="table-title">All Restaurants</h2>
          <div class="search-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="search" placeholder="Search..." />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading...</p>
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>

        <!-- Empty -->
        <div v-if="!loading && filteredRestaurants.length === 0 && !error" class="empty-state">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <p>No restaurants found</p>
        </div>

        <!-- Table -->
        <div class="table-wrapper" v-if="!loading && filteredRestaurants.length" data-aos="zoom-in" :data-aos-delay="index * 100">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedRestaurants" :key="item.id">
                <td class="td-id"><span class="id-badge">#{{ item.id }}</span></td>
                <td class="td-name">{{ item.name }}</td>
                <td>{{ item.contact }}</td>
                <td>{{ item.address }}</td>
                <td class="td-actions">
                  <router-link class="btn btn-edit" :to="'/update-resturent/' + item.id">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                  </router-link>
                  <button class="btn btn-delete" @click="deleteResturent(item.id)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && totalPages > 1" class="pagination">
          <button @click="currentPage--" :disabled="currentPage === 1" class="page-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="['page-btn', { active: currentPage === page }]"
          >{{ page }}</button>
          <button @click="currentPage++" :disabled="currentPage === totalPages" class="page-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import API from "@/services/api";

export default {
  name: "AdminDashboard",
  data() {
    return {
      name: "",
      resturent: [],
      loading: false,
      error: null,
      search: "",
      currentPage: 1,
      perPage: 10,
    };
  },

  methods: {
    async deleteResturent(id) {
      if (!confirm("Are you sure you want to delete this restaurant?")) {
        return;
      }

      try {
        await API.delete(`/resturent/${id}`);
        this.getResturent();
      } catch (error) {
        alert("Failed to delete. Try again.");
      }
    },

    async getResturent() {
      this.loading = true;
      this.error = null;

      try {
        const result = await API.get("/resturent");
        this.resturent = result.data;
      } catch (err) {
        this.error = "Failed to load restaurants. Please try again.";
      } finally {
        this.loading = false;
      }
    },

    beforeCreate() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || user.role !== "admin") {
        this.$router.push({ name: "Home" });
      }
    },

    async loadData() {
      const user = localStorage.getItem("user");

      if (!user) {
        this.$router.push({ name: "Login" });
        return;
      }

      try {
        const parsedUser = JSON.parse(user);
        this.name = parsedUser.name || "";
      } catch (e) {
        console.error("Invalid user data", e);
      }
    },
  },

  async mounted() {
    this.beforeCreate();
    this.loadData();
    this.getResturent();
  },

  computed: {
    filteredRestaurants() {
      return this.resturent.filter(
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
/* ===== Hero ===== */
.dash-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 40px 24px;
  overflow: hidden;
}

.dash-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.15), transparent 60%);
}

.dash-hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.dash-title {
  font-size: 28px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.dash-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  white-space: nowrap;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
}

/* ===== Content ===== */
.dash-content {
  padding: 28px 0 48px;
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.stat-card {
  background: white;
  border-radius: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
}

/* Table card */
.table-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  gap: 16px;
}

.table-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  white-space: nowrap;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 40px;
  background: var(--bg-card-alt);
  border: 1px solid var(--border);
  border-radius: 10px;
  max-width: 260px;
  width: 100%;
}

.search-wrapper svg {
  flex-shrink: 0;
  color: var(--text-muted);
}

.search-wrapper input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--text-primary);
  outline: none;
  min-width: 0;
  height: 100%;
  padding: 0;
  margin: 0;
}

/* Loading/Empty */
.loading-state {
  text-align: center;
  padding: 48px 0;
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

.error-msg {
  color: var(--danger);
  font-size: 14px;
  padding: 20px 24px;
}

.empty-state {
  text-align: center;
  padding: 48px 0;
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

/* Table */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

thead th {
  padding: 12px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  background: var(--bg-card-alt);
  border-bottom: 1px solid var(--border);
}

tbody td {
  padding: 14px 20px;
  font-size: 13px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border);
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background 0.2s;
}

tbody tr:hover {
  background: rgba(59, 130, 246, 0.03);
}

.id-badge {
  display: inline-block;
  padding: 3px 8px;
  background: var(--bg-card-alt);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
}

.td-name {
  font-weight: 600;
  color: var(--text-primary);
}

.td-actions {
  white-space: nowrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 14px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.25s ease;
}

.btn-edit {
  background: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  margin-right: 6px;
}

.btn-edit:hover {
  background: rgba(59, 130, 246, 0.15);
}

.btn-delete {
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.15);
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 24px;
  border-top: 1px solid var(--border);
}

.page-btn {
  min-width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  background: white;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
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
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .dash-hero {
    padding: 32px 16px;
  }

  .dash-hero-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .dash-title {
    font-size: 22px;
  }

  .add-btn {
    width: 100%;
    justify-content: center;
  }

  .dash-content {
    padding: 20px 0 40px;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .table-header {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }

  .search-wrapper {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .dash-title {
    font-size: 20px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-num {
    font-size: 20px;
  }

  thead th, tbody td {
    padding: 10px 14px;
    font-size: 12px;
  }
}
</style>
