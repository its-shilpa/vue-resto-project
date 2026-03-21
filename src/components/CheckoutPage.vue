<template>
  <div class="checkout-page">
    <!-- Hero Banner -->
    <section class="checkout-hero">
      <div class="checkout-hero-bg"></div>
      <div class="checkout-hero-content" data-aos="fade-down" data-aos-duration="1000">
        <h1 class="checkout-title">Secure <span>Checkout</span></h1>
        <p class="checkout-subtitle">Complete your order by providing shipping details</p>
      </div>
    </section>

    <div class="checkout-wrapper page-container">
      <div v-if="cart.length === 0" class="empty-checkout">
      <div class="empty-icon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
      </div>
      <h2>Your cart is empty</h2>
      <p>Please add items to your cart before proceeding to checkout.</p>
      <button class="back-btn" @click="$router.push('/all-restaurants')">Browse Restaurants</button>
    </div>

    <div v-else class="checkout-grid">
      <!-- Left Column: Shipping Form -->
      <div class="checkout-form-section" data-aos="fade-right">
        <form @submit.prevent="placeOrder" class="checkout-form">
          <h2 class="section-title">Shipping Details</h2>
          
          <div class="form-group" :class="{ 'has-error': errors.name && form.name !== null }">
            <label>Full Name</label>
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" class="input-icon" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <input type="text" v-model="form.name" @blur="validateField('name')" @input="clearError('name')" required placeholder="Enter your full name" />
            </div>
            <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.phone && form.phone !== null }">
            <label>Phone Number</label>
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" class="input-icon" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <input type="tel" v-model="form.phone" @blur="validateField('phone')" @input="clearError('phone')" required placeholder="10-digit mobile number" />
            </div>
            <span v-if="errors.phone" class="error-msg">{{ errors.phone }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.address && form.address !== null }">
            <label>Delivery Address</label>
            <div class="input-wrapper textarea-wrapper">
              <svg viewBox="0 0 24 24" fill="none" class="input-icon" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <textarea v-model="form.address" @blur="validateField('address')" @input="clearError('address')" required placeholder="Complete street address, apartment, or suite number" rows="3"></textarea>
            </div>
            <span v-if="errors.address" class="error-msg">{{ errors.address }}</span>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.pincode && form.pincode !== null }">
            <label>Pincode</label>
            <div class="input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" class="input-icon" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input type="text" v-model="form.pincode" maxlength="6" @blur="validateField('pincode')" @input="clearError('pincode')" required placeholder="6-digit ZIP / Pincode" />
            </div>
            <span v-if="errors.pincode" class="error-msg">{{ errors.pincode }}</span>
          </div>
        </form>
      </div>

      <!-- Right Column: Order Summary -->
      <div class="checkout-summary-section" data-aos="fade-left">
        <div class="summary-card">
          <h2 class="section-title">Order Summary</h2>
          
          <div class="summary-items-list">
            <div v-for="item in cart" :key="item.id" class="summary-item">
              <div class="item-info">
                <span class="qty">{{ item.qty }}x</span>
                <span class="name">{{ item.name }}</span>
              </div>
              <span class="price">₹{{ item.price * item.qty }}</span>
            </div>
          </div>

          <div class="summary-breakdown">
            <div class="row">
              <span>Item Total</span>
              <span>₹{{ total }}</span>
            </div>
            <div class="row">
              <span>Tax & Fees</span>
              <span>₹{{ tax }}</span>
            </div>
            <div class="row delivery">
              <span>Delivery Partner Fee</span>
              <span>{{ deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge }}</span>
            </div>
          </div>

          <div class="summary-footer">
            <div class="grand-total">
              <span>To Pay</span>
              <span class="total-amount">₹{{ finalTotal }}</span>
            </div>
            
            <button 
              class="place-order-btn" 
              :class="{ 'processing': isProcessing }"
              :disabled="!isFormValid || isProcessing"
              @click="placeOrder"
            >
              <span v-if="!isProcessing">
                Place Order
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
              <span v-else class="processing-spinner"></span>
            </button>
            <p v-if="!isFormValid" class="validation-note">Please fill in all shipping details</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartService from "@/services/cartService";
import API from "@/services/api";

export default {
  name: "CheckoutPage",
  data() {
    return {
      cart: [],
      form: {
        name: "",
        phone: "",
        address: "",
        pincode: ""
      },
      errors: {
        name: null,
        phone: null,
        address: null,
        pincode: null
      },
      isProcessing: false,
    };
  },
  computed: {
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
      return this.total + this.tax + this.deliveryCharge;
    },
    isFormValid() {
      return (
        this.form.name.trim().length > 0 &&
        this.form.phone.trim().length >= 10 &&
        this.form.address.trim().length > 5 &&
        this.form.pincode.trim().length >= 4 &&
        this.form.pincode.trim().length <= 6 &&
        /^\d+$/.test(this.form.pincode.trim())
      );
    }
  },
  mounted() {
    this.cart = cartService.getCart();
    
    // Auto-fill user name and any known info
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.name) this.form.name = user.name;
      if (user.phone) this.form.phone = user.phone;
      if (user.address) this.form.address = user.address;
    }
  },
  methods: {
    validateField(field) {
      if (field === 'name') {
        if (!this.form.name.trim()) this.errors.name = "Full name is required";
        else this.errors.name = null;
      }
      if (field === 'phone') {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!this.form.phone.trim()) this.errors.phone = "Phone number is required";
        else if (!phoneRegex.test(this.form.phone.replace(/[\s-]/g, ''))) this.errors.phone = "Please enter a valid 10+ digit phone number";
        else this.errors.phone = null;
      }
      if (field === 'address') {
        if (!this.form.address.trim() || this.form.address.trim().length < 5) this.errors.address = "Please enter a complete delivery address";
        else this.errors.address = null;
      }
      if (field === 'pincode') {
        const pin = this.form.pincode.trim();
        if (!pin || pin.length < 4 || pin.length > 6 || !/^\d+$/.test(pin)) {
          this.errors.pincode = "Pincode must be between 4 and 6 numeric digits";
        } else {
          this.errors.pincode = null;
        }
      }
    },
    clearError(field) {
      this.errors[field] = null;
    },
    validateAll() {
      this.validateField('name');
      this.validateField('phone');
      this.validateField('address');
      this.validateField('pincode');
      return !this.errors.name && !this.errors.phone && !this.errors.address && !this.errors.pincode;
    },
    async placeOrder() {
      if (!this.validateAll()) return;
      if (!this.isFormValid) return;

      this.isProcessing = true;
      const user = JSON.parse(localStorage.getItem("user"));

      const order = {
        userId: user ? user.id : 'guest',
        items: this.cart,
        total: this.finalTotal,
        shippingAddress: { ...this.form },
        status: "placed",
        createdAt: new Date()
      };

      try {
        await API.post("/orders", order);
        cartService.clearCart();
        window.dispatchEvent(new Event("cart-updated"));

        if (window.$toast) {
          window.$toast.show("📦 Order placed successfully!");
        } else {
          alert("Order placed successfully!");
        }

        setTimeout(() => {
          this.$router.push("/orders");
        }, 1500);
      } catch (e) {
        console.error("Checkout failed", e);
        if (window.$toast) window.$toast.show("❌ Checkout failed");
      } finally {
        this.isProcessing = false;
      }
    }
  }
};
</script>

<style scoped>
/* ===== Hero Banner ===== */
.checkout-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 48px 24px;
  overflow: hidden;
  text-align: center;
}

.checkout-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 70% 30%,
    rgba(59, 130, 246, 0.2),
    transparent 50%
  );
}

.checkout-hero-content {
  position: relative;
  z-index: 2;
}

.checkout-title {
  font-size: 34px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.checkout-title span {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.checkout-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
}

/* ===== Layout ===== */
.checkout-wrapper {
  padding-top: 40px;
  padding-bottom: 80px;
}

.empty-checkout {
  text-align: center;
  padding: 60px 20px;
  background: var(--bg-card);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.back-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px rgba(37, 99, 235, 0.3);
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  align-items: start;
}

/* Form Styles */
.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  color: var(--text-primary);
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.checkout-form {
  background: var(--bg-card);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper.textarea-wrapper {
  align-items: flex-start;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--text-muted);
}

.textarea-wrapper .input-icon {
  top: 16px;
  transform: none;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 14px 16px 14px 44px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-color);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 15px;
  transition: all 0.3s ease;
}

.input-wrapper textarea {
  resize: vertical;
  min-height: 100px;
}

.input-wrapper input:focus,
.input-wrapper textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.input-wrapper input:focus ~ .input-icon,
.input-wrapper textarea:focus ~ .input-icon {
  color: #3b82f6;
}

.has-error .input-wrapper input,
.has-error .input-wrapper textarea {
  border-color: #ef4444;
}

.has-error .input-icon {
  color: #ef4444;
}

.error-msg {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 6px;
  font-weight: 500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-3px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Summary Card */
.summary-card {
  background: var(--bg-card);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  position: sticky;
  top: 90px;
}

.summary-items-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.summary-items-list::-webkit-scrollbar {
  width: 6px;
}

.summary-items-list::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--border);
}

.item-info {
  display: flex;
  gap: 12px;
}

.qty {
  font-weight: 700;
  color: #10b981;
}

.name {
  color: var(--text-secondary);
  line-height: 1.4;
}

.price {
  font-weight: 600;
  color: var(--text-primary);
}

.summary-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
}

.row {
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

.row.delivery span:last-child {
  color: #10b981;
}

.grand-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.grand-total span:first-child {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.total-amount {
  font-size: 20px;
  font-weight: 800;
  color: var(--primary);
}

.place-order-btn {
  width: 100%;
  padding: 16px;
  /* background: linear-gradient(135deg, #10b981, #059669); */
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.place-order-btn span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.place-order-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.place-order-btn:disabled {
  background: var(--border);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  color: var(--text-muted);
}

.validation-note {
  font-size: 12px;
  color: #ef4444;
  text-align: center;
  margin-top: 12px;
}

.processing-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}

@media (max-width: 992px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }

  .summary-card {
    position: static;
  }
}

@media (max-width: 480px) {
  .checkout-form {
    padding: 20px;
  }
  
  .summary-card {
    padding: 20px;
  }

  .checkout-grid {
    gap: 24px;
  }
}
</style>
