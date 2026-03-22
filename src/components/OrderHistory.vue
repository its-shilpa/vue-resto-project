<template>
  <div class="orders-page relative z-0">
    <!-- SVG Floating Pattern Background -->
    <div class="floating-bg">
      <svg
        class="float-icon float-icon-1"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M12 2L2 22h20L12 2zM12 9v4" />
      </svg>
      <svg
        class="float-icon float-icon-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      </svg>
      <svg
        class="float-icon float-icon-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
        />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
      <svg
        class="float-icon float-icon-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
      <svg
        class="float-icon float-icon-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
        <line x1="9.69" y1="8" x2="21.17" y2="8" />
        <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
        <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
        <line x1="14.31" y1="16" x2="2.83" y2="16" />
        <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
      </svg>
      <svg
        class="float-icon float-icon-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    </div>

    <!-- Hero Banner -->
    <section class="orders-hero">
      <div class="orders-hero-bg"></div>
      <div
        class="orders-hero-content"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <h1 class="orders-title">My <span>Orders</span></h1>
        <p class="orders-subtitle">
          Track your past purchases and reorder favorites
        </p>
      </div>
    </section>

    <div class="orders-wrapper page-container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading your orders...</p>
      </div>

      <!-- No Orders -->
      <div v-else-if="!orders.length" class="empty-state" data-aos="zoom-in">
        <div class="empty-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="48"
            height="48"
          >
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders so far. Why not treat yourself?</p>
        <button class="browse-btn" @click="$router.push('/all-restaurants')">
          Browse Restaurants
        </button>
      </div>

      <!-- Orders List -->
      <div v-else class="orders-list">
        <div
          v-for="(order, index) in sortedOrders"
          :key="order.id"
          class="order-card"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <!-- Order Header -->
          <div class="order-header">
            <div class="order-meta">
              <span class="order-id">Order #{{ order.id }}</span>
              <span class="order-date">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div class="order-status-wrap">
              <span :class="['status-badge', getStatusClass(order.status)]">
                {{ capitalize(order.status) }}
              </span>
            </div>
          </div>

          <!-- Order Items -->
          <div class="order-items">
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <div class="item-img-wrap" v-if="item.image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="item-details-left">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-resto" v-if="item.restaurant"
                  >📍 {{ item.restaurant }}</span
                >
                <span class="item-price-unit">₹{{ item.price }}</span>
              </div>
              <div class="item-details-right">
                <span class="item-qty">x{{ item.qty }}</span>
                <span class="item-total-price"
                  >₹{{ item.price * item.qty }}</span
                >
              </div>
            </div>
          </div>

          <!-- Order Footer -->
          <div class="order-footer">
            <div class="total-section">
              <div class="total-label">Total Amount</div>
              <div class="total-price">₹{{ order.total }}</div>
            </div>
            <div class="order-review">
              <button
                class="review-btn"
                v-if="!order.reviewed"
                @click="openReview(order)"
                :disabled="!isDelivered(order)"
              >
                <span class="star-icon">⭐</span> Write Review
              </button>
              <button
                class="review-btn reviewed-btn"
                v-else
                disabled
              >
                <span class="check-icon">✓</span> Reviewed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showReviewModal" class="review-modal-overlay">
    <div class="review-modal-content">
      <div class="modal-header">
        <h3>Write a Review</h3>
        <button class="close-btn" @click="showReviewModal = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>Rating</label>
          <div class="star-rating-select">
            <button 
              v-for="n in 5" 
              :key="n" 
              class="star-btn" 
              :class="{ active: review.rating >= n }"
              @click="review.rating = n"
            >
              ★
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Comment</label>
          <textarea v-model="review.comment" placeholder="Share your experience..."></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button class="cancel-btn" @click="showReviewModal = false">Cancel</button>
        <button class="submit-btn" @click="submitReview" :disabled="!review.rating || !review.comment">Submit Review</button>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/services/api";

export default {
  name: "OrderHistory",
  data() {
    return {
      orders: [],
      loading: true,

      showReviewModal: false,
      selectedOrder: null,
      review: {
        rating: "",
        comment: "",
      },
    };
  },

  computed: {
    sortedOrders() {
      // Sort newest first
      return [...this.orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    },
  },

  async mounted() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      this.$router.push("/login");
      return;
    }

    try {
      const res = await API.get(`/orders?userId=${user.id}`);
      this.orders = res.data.map((order) => ({
        ...order,
        reviewed: order.reviewed || false,
      }));
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    },

    capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    getStatusClass(status) {
      const s = String(status).toLowerCase();
      if (s === "delivered" || s === "completed") return "status-success";
      if (s === "placed" || s === "pending") return "status-warning";
      if (s === "cancelled") return "status-danger";
      return "status-default";
    },

    isDelivered(order) {
      return ["placed", "delivered", "completed"].includes(order.status.toLowerCase());
    },

    openReview(order) {
      this.selectedOrder = order;
      this.showReviewModal = true;
    },

    async submitReview() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!this.review.rating || !this.review.comment) {
        alert("Please fill all fields");
        return;
      }

      try {
        const existingRes = await API.get("/reviews");
        const alreadyReviewed = existingRes.data.some(r => r.orderId === this.selectedOrder.id);

        if (alreadyReviewed) {
          alert("You already reviewed this order");
          return;
        }

        await API.post("/reviews", {
          orderId: this.selectedOrder.id,
          restaurantId: this.selectedOrder.items[0]?.restaurant, // or restaurantId if exists
          userId: user.id,
          rating: this.review.rating,
          comment: this.review.comment,
          createdAt: new Date(),
        });

        // ✅ Add review to the specific ordered dishes
        const restNames = [...new Set(this.selectedOrder.items.map(i => i.restaurant).filter(Boolean))];
        
        for (const restName of restNames) {
          const restRes = await API.get(`/resturent?name=${restName}`);
          const restaurant = restRes.data[0];
          
          if (restaurant && restaurant.popularDishes) {
            let dishesUpdated = false;
            const itemsForRest = this.selectedOrder.items.filter(i => i.restaurant === restName);
            const itemNames = itemsForRest.map(i => i.name);
            
            const updatedDishes = restaurant.popularDishes.map(dish => {
              if (itemNames.includes(dish.name)) {
                dishesUpdated = true;
                const newReview = {
                  user: user.name,
                  rating: this.review.rating,
                  comment: this.review.comment
                };
                return {
                  ...dish,
                  reviews: [...(dish.reviews || []), newReview]
                };
              }
              return dish;
            });
            
            if (dishesUpdated) {
              await API.patch(`/resturent/${restaurant.id}`, {
                popularDishes: updatedDishes
              });
            }
          }
        }

        // ✅ Persist reviewed status
        await API.patch(`/orders/${this.selectedOrder.id}`, {
          reviewed: true,
        });

        this.selectedOrder.reviewed = true;

        // ✅ Reset form
        this.review = { rating: "", comment: "" };
        this.showReviewModal = false;

        if (window.$toast) {
          window.$toast.show("⭐ Review submitted successfully!");
        } else {
          alert("Review submitted successfully!");
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
/* ===== Floating Background Pattern ===== */
.floating-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.float-icon {
  position: absolute;
  color: var(--primary);
  opacity: 0.04;
  width: 64px;
  height: 64px;
}

.float-icon-1 {
  top: 20%;
  left: 10%;
  animation: float 14s infinite ease-in-out alternate;
}
.float-icon-2 {
  top: 40%;
  right: 15%;
  animation: float 18s infinite ease-in-out alternate-reverse;
  width: 80px;
  height: 80px;
}
.float-icon-3 {
  top: 70%;
  left: 5%;
  animation: float 12s infinite ease-in-out alternate;
  width: 50px;
  height: 50px;
}
.float-icon-4 {
  top: 80%;
  right: 10%;
  animation: float 15s infinite ease-in-out alternate-reverse;
  width: 70px;
  height: 70px;
}
.float-icon-5 {
  top: 50%;
  left: 30%;
  animation: float 20s infinite ease-in-out alternate;
}
.float-icon-6 {
  top: 10%;
  right: 30%;
  animation: float 17s infinite ease-in-out alternate-reverse;
  width: 55px;
  height: 55px;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(30px, 40px) rotate(15deg);
  }
  100% {
    transform: translate(-20px, -20px) rotate(-10deg);
  }
}

/* ===== Hero Banner ===== */
.orders-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 48px 24px;
  overflow: hidden;
  text-align: center;
  z-index: 1;
}

.orders-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 30% 70%,
    rgba(59, 130, 246, 0.2),
    transparent 50%
  );
}

.orders-hero-content {
  position: relative;
  z-index: 2;
}

.orders-title {
  font-size: 34px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.orders-title span {
  /* background: linear-gradient(135deg, #3b82f6, #60a5fa); */
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.orders-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

/* ===== Layout ===== */
.orders-page {
  position: relative;
}

.orders-wrapper {
  padding-top: 40px;
  padding-bottom: 80px;
  max-width: 800px; /* Keep it narrow for better readability */
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* ===== Loading state ===== */
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
  to {
    transform: rotate(360deg);
  }
}

/* ===== Orders List ===== */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  overflow: hidden;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

/* Header */
.order-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.order-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-id {
  font-size: 16px;
  font-weight: 800;
  color: #fbbf24;
  font-family: monospace;
}

.order-date {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.status-success {
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-warning {
  background: #385d51;
  color: #75e96e;
  border: 1px solid #376657;
}

.status-danger {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.status-default {
  background: var(--border);
  color: var(--text-secondary);
}

.order-items {
  padding: 16px 24px;
  background: var(--bg-page);
}

.order-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.item-img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.item-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.item-resto {
  font-size: 12px;
  color: var(--text-muted);
}

.item-price-unit {
  font-size: 13px;
  color: var(--text-secondary);
}

.item-details-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.item-qty {
  background: white;
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid var(--border);
}

.item-total-price {
  font-size: 16px;
  font-weight: 800;
  color: var(--primary);
}

/* Footer */
.order-footer {
  padding: 20px 24px;
  background: linear-gradient(180deg, #fdfbfb 0%, #fffcf3 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.total-label {
  font-size: 13px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.total-price {
  font-size: 22px;
  font-weight: 900;
  color: #ef4444;
  line-height: 1;
}

/* ===== Review Button ===== */
.review-btn {
  /* background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); */
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(11, 155, 245, 0.25);
}

.review-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(11, 167, 245, 0.4);
}

.review-btn:disabled {
  background: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
  box-shadow: none;
  border: 1px solid #e2e8f0;
}

.review-btn .star-icon {
  font-size: 15px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.reviewed-btn {
  background: #f0fdf4 !important;
  color: #166534 !important;
  border: 1px solid #bbf7d0 !important;
  pointer-events: none;
}

.reviewed-btn .check-icon {
  background: #22c55e;
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

/* ===== Empty State ===== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.empty-icon-wrap {
  width: 90px;
  height: 90px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.08),
    rgba(99, 102, 241, 0.12)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.empty-state h2 {
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-muted);
  font-size: 15px;
  margin-bottom: 24px;
}

.browse-btn {
  background: var(--primary-gradient);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
}

.browse-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .orders-hero {
    padding: 32px 20px;
  }
  .orders-title {
    font-size: 26px;
  }
  .order-header {
    flex-direction: column;
    gap: 12px;
  }
  .order-status-wrap {
    align-self: flex-start;
  }
  .item-info {
    flex-wrap: wrap;
    gap: 6px;
  }
  .item-resto {
    flex-basis: 100%;
    margin-left: 0;
  }
}

/* ===== Review Modal Premium Styles ===== */
.review-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.review-modal-content {
  background: white;
  width: 100%;
  max-width: 450px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  padding: 24px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
}

.close-btn {
  background: rgba(0, 0, 0, 0.04);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.08);
  color: var(--text-primary);
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.star-rating-select {
  display: flex;
  gap: 8px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 32px;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
  padding: 0;
}

.star-btn:hover,
.star-btn.active {
  color: #fbbf24;
  transform: scale(1.1);
}

.form-group textarea {
  width: 100%;
  min-height: 120px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  font-family: inherit;
  font-size: 15px;
  resize: vertical;
  background: #f8fafc;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.modal-footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn {
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: white;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  background: #f1f5f9;
  color: var(--text-primary);
}

.submit-btn {
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  background: var(--primary-gradient);
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
