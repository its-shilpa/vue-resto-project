<template>
  <div class="cart-page">
    <!-- Hero Banner -->
    <section class="cart-hero">
      <div class="cart-hero-bg"></div>
      <div
        class="cart-hero-content"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <h1 class="cart-title">Your <span>Cart</span></h1>
        <p class="cart-subtitle">Review your items and proceed to checkout</p>
      </div>
    </section>

    <div class="cart-wrapper page-container">
      <div v-if="cart.length" class="cart-content" data-aos="fade-up">
        <!-- Cart Items List -->
        <div class="cart-items">
          <div class="cart-header">
            <h3>{{ cartCount }} Items</h3>
          </div>
          <div
            v-for="(item, index) in cart"
            :key="item.id"
            class="cart-item"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="item-img-wrap">
              <img
                :src="item.image || 'https://via.placeholder.com/150'"
                :alt="item.name"
              />
            </div>

            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="item-resto" v-if="item.restaurant">
                📍 {{ item.restaurant }}
              </p>
              <div class="item-price">₹{{ item.price }}</div>
            </div>

            <div class="item-actions">
              <div class="item-qty">
                <button @click="decreaseQty(item)">-</button>
                <span>{{ item.qty }}</span>
                <button @click="increaseQty(item)">+</button>
              </div>
              <button class="remove-btn" @click="remove(item)">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="16"
                  height="16"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path
                    d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="cart-summary" data-aos="fade-left" data-aos-delay="200">
          <h3>Order Summary</h3>

          <div class="summary-row">
            <span>Subtotal</span>
            <span>₹{{ total }}</span>
          </div>
          <div class="summary-row">
            <span>Taxes & Fees</span>
            <span>₹{{ tax }}</span>
          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span v-if="deliveryCharge === 0" class="free">Free</span>
            <span v-else>₹{{ deliveryCharge }}</span>
          </div>
          <div class="coupon-box">
            <input 
                v-model="couponCode" 
                placeholder="Enter coupon code" @input="couponCode = couponCode.toUpperCase()"
            />
            <button @click="applyCoupon" :disabled="!couponCode">Apply</button>
            </div>

            <div v-if="appliedCoupon" class="applied-coupon">
            ✅ {{ appliedCoupon }} applied
            <button @click="removeCoupon">Remove</button>
        </div>
        <div v-if="discount > 0" class="summary-row">
        <span>Discount</span>
        <span style="color: green;">-₹{{ discount }}</span>
        </div>
          <hr class="summary-divider" />
          <div class="summary-row total">
            <span>Total</span>
            <span>₹{{ finalTotal }}</span>
          </div>

          <button class="checkout-btn" @click="checkout">
            Proceed to Checkout
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="18"
              height="18"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state" data-aos="zoom-in">
        <div class="empty-icon-wrap">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="48"
            height="48"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path
              d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
            />
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any delicious dishes yet.</p>
        <button class="browse-btn" @click="$router.push('/all-restaurants')">
          Browse Restaurants
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from "@/services/cartService";

export default {
  data() {
    return {
        cart: [],
        couponCode: "",
        discount: 0,   
        appliedCoupon: null
    };
  },

  computed: {
    cartCount() {
      return this.cart.reduce((sum, item) => sum + item.qty, 0);
    },
    total() {
      return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    tax() {
      if (this.total === 0) return 0;
      if (this.total < 1000) return 15;
      if (this.total < 2000) return 20;
      return 30;
    },
    deliveryCharge() {
      if (this.total === 0) return 0;
      return this.total > 199 ? 0 : 40;
    },
    finalTotal() {
      return this.total + this.tax + this.deliveryCharge - this.discount;
    },
  },

  mounted() {
    this.cart = cartService.getCart();
  },

  methods: {
    remove(item) {
    cartService.removeFromCart(item.id);
    this.cart = cartService.getCart();
    window.dispatchEvent(new Event("cart-updated"));
    },

    checkout() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        if (window.$toast) window.$toast.show("Please login to proceed to checkout");
        else alert("Please login first");
        this.$router.push("/login");
        return;
      }

      this.$router.push("/checkout");
    },

    increaseQty(item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const found = cart.find((i) => i.id === item.id);
      if (found) {
        found.qty += 1;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.loadCart();

      window.dispatchEvent(new Event("cart-updated"));
    },

    decreaseQty(item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const found = cart.find((i) => i.id === item.id);

      if (found) {
        if (found.qty > 1) {
          found.qty -= 1;
        } else {
          // remove if qty = 0
          const updated = cart.filter((i) => i.id !== item.id);
          localStorage.setItem("cart", JSON.stringify(updated));
          this.loadCart();
          window.dispatchEvent(new Event("cart-updated"));
          return;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.loadCart();

      window.dispatchEvent(new Event("cart-updated"));
    },
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    },

    applyCoupon() {
      const code = this.couponCode.trim().toUpperCase();

      if (code === "SAVE50") {
        this.discount = 50;
        this.appliedCoupon = "SAVE50";
        window.$toast?.show("🎉 ₹50 discount applied!");
      } else if (code === "NEWUSER") {
        this.discount = Math.round(this.total * 0.1); // 10%
        this.appliedCoupon = "NEWUSER";
        window.$toast?.show("🎉 10% discount applied!");
      } else {
        this.discount = 0;
        this.appliedCoupon = null;
        window.$toast?.show("❌ Invalid coupon");
      }
    },

    removeCoupon() {
      this.discount = 0;
      this.appliedCoupon = null;
      this.couponCode = "";
    },
  },
};
</script>

<style scoped>
/* ===== Hero Banner ===== */
.cart-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 48px 24px;
  overflow: hidden;
  text-align: center;
}

.cart-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 70% 30%,
    rgba(59, 130, 246, 0.2),
    transparent 50%
  );
}

.cart-hero-content {
  position: relative;
  z-index: 2;
}

.cart-title {
  font-size: 34px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.cart-title span {
  /* background: linear-gradient(135deg, #3b82f6, #60a5fa); */
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cart-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

/* ===== Layout ===== */
.cart-wrapper {
  padding-top: 40px;
  padding-bottom: 80px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
}

/* ===== Cart Items ===== */
.cart-items {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.cart-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border);
  background: var(--bg-card-alt);
}

.cart-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border);
  gap: 20px;
  transition: all 0.3s ease;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background: rgba(248, 250, 252, 0.6);
}

.item-qty {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card-alt);
  padding: 4px;
  border-radius: 10px;
  border: 1px solid var(--border);
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}

.item-qty button {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.item-qty button:hover {
  background: var(--primary-light);
  color: white;
  border-color: var(--primary-light);
  transform: scale(1.05);
}

.item-qty span {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 16px;
  text-align: center;
}

.item-img-wrap {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.item-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h4 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.item-resto {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.item-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--primary);
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.remove-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  background: #ef4444;
  color: white;
}

/* ===== Summary ===== */
.cart-summary {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  position: sticky;
  top: 88px;
}

.cart-summary h3 {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--text-secondary);
}

.summary-row span.free {
  color: var(--success);
  font-weight: 700;
}

.summary-divider {
  border: none;
  border-top: 1px dashed var(--border);
  margin: 16px 0;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.coupon-box {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.coupon-box input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.coupon-box input:focus {
  border-color: #3b82f6;
}

.coupon-box button {
  background: var(--bg-card-alt);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.coupon-box button:not(:disabled):hover {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.coupon-box button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.applied-coupon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(16, 185, 129, 0.1);
  color: #059669;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.applied-coupon button {
  background: none;
  border: none;
  color: #ef4444;
  font-weight: 600;
  cursor: pointer;
  font-size: 13px;
}

.applied-coupon button:hover {
  text-decoration: underline;
}

.checkout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

/* ===== Empty State ===== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  max-width: 600px;
  margin: 0 auto;
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
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.browse-btn:hover {
  background: black;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  .cart-summary {
    position: static;
  }
}

@media (max-width: 640px) {
  .cart-hero {
    padding: 32px 20px;
  }
  .cart-title {
    font-size: 26px;
  }
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    padding: 16px;
  }
  .item-img-wrap {
    width: 100%;
    height: 140px;
  }
  .item-actions {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-top: 8px;
  }
  .remove-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
