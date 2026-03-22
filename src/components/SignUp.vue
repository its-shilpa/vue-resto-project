<template>
  <div class="auth-page">
    <!-- Left: Hero Panel -->
    <div class="auth-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content" data-aos="fade-right" data-aos-duration="1000">
        <div class="hero-badge">🍽️ RestroHub</div>
        <h2 class="hero-title">Start Your<br />Journey <span class="hero-accent">Today</span></h2>
        <p class="hero-text">Join thousands of restaurant owners who trust RestroHub to manage their business efficiently and grow revenue.</p>
        <div class="hero-features">
          <div class="feature">
            <span class="feature-icon">✅</span>
            <span>Free to get started</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✅</span>
            <span>No credit card required</span>
          </div>
          <div class="feature">
            <span class="feature-icon">✅</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
      <!-- Animated shapes -->
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <!-- Right: Form Panel -->
    <div class="auth-form-panel">
      <div class="form-container" data-aos="fade-left" data-aos-duration="800" data-aos-delay="200">
        <div class="form-top">
          <h1 class="form-title">Create Account</h1>
          <p class="form-subtitle">Fill in your details to get started</p>
        </div>

        <div class="register">
          <div class="input-group">
            <label class="input-label">Full Name</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input type="text" v-model.trim="name" placeholder="John Doe" />
            </div>
            <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
          </div>

          <div class="input-group">
            <label class="input-label">Email</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input type="email" v-model.trim="email" placeholder="you@example.com" />
            </div>
            <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
          </div>

          <div class="input-group">
            <label class="input-label">Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Min. 6 characters"
              />
              <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <p v-if="errors.password" class="field-error">{{ errors.password }}</p>
          </div>

          <div class="input-group">
            <label class="input-label">Confirm Password</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Re-enter password"
              />
            </div>
            <p v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</p>
          </div>

          <button type="button" class="submit-btn" :disabled="loading" @click="signUp">
            <span>{{ loading ? "Creating account..." : "Create Account" }}</span>
            <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>

          <p v-if="errors.general" class="auth-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            {{ errors.general }}
          </p>
        </div>

        <div class="form-footer">
          <div class="divider"><span>or</span></div>
          <p class="auth-switch">
            Already have an account?
            <router-link to="/login">Sign in instead →</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      errors: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: ""
      }
    };
  },

  methods: {
    validate() {
      let isValid = true;

      this.errors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        general: ""
      };

      if (!this.name) {
        this.errors.name = "Name is required";
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = "Enter a valid email address";
        isValid = false;
      }

      if (!this.password) {
        this.errors.password = "Password is required";
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      if (!this.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
        isValid = false;
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
        isValid = false;
      }

      return isValid;
    },

    async signUp() {
      if (!this.validate()) return;

      this.loading = true;

      try {
        const response = await API.get("/users");
        // Verify via Client-side to support legacy Backend
        const isTaken = response.data.some(u => u.email === this.email);

        if (isTaken) {
          this.errors.email = "Email already registered";
          return;
        }

        await API.post("/users", {
          name: this.name,
          email: this.email,
          password: this.password,
          role: "user",
          isLoggedIn: false
        });

        this.$router.push({ name: "Login" });
      } catch (error) {
        this.errors.general = "Signup failed. Try again.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style scoped>
/* ===== Layout ===== */
.auth-page {
  min-height: 100vh;
  display: flex;
  background: #f8fafc;
}

/* ===== Hero Panel ===== */
.auth-hero {
  flex: 1;
  background: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=1600&fit=crop') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 48px;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 64, 175, 0.85) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 460px;
}

.hero-badge {
  display: inline-block;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: 0.3px;
}

.hero-title {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.hero-accent {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-text {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 28px;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.feature-icon {
  font-size: 16px;
}

/* Animated shapes */
.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.15);
  z-index: 1;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -60px;
  right: -80px;
  animation: floatShape 15s ease-in-out infinite;
}

.shape-2 {
  width: 160px;
  height: 160px;
  top: 40%;
  left: -40px;
  background: rgba(245, 158, 11, 0.12);
  animation: floatShape 12s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 10%;
  background: rgba(16, 185, 129, 0.12);
  animation: floatShape 18s ease-in-out infinite;
}

@keyframes floatShape {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(15px, -20px) scale(1.05); }
  66% { transform: translate(-10px, 15px) scale(0.95); }
}

/* ===== Form Panel ===== */
.auth-form-panel {
  width: 540px;
  min-width: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  overflow-y: auto;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.form-top {
  margin-bottom: 28px;
}

.form-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.3px;
}

.form-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* Input groups */
.input-group {
  margin-bottom: 16px;
}

.input-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
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
}

.input-wrapper input {
  width: 100%;
  max-width: 100%;
  height: 46px;
  padding: 0 44px 0 42px;
  border: 2px solid var(--border);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-card-alt);
  transition: all 0.25s ease;
  outline: none;
  margin-bottom: 0;
}

.input-wrapper input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.toggle-pass {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.toggle-pass:hover {
  color: var(--text-primary);
}

.field-error {
  color: var(--danger);
  font-size: 12px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Submit button */
.submit-btn {
  width: 100%;
  height: 50px;
  margin-top: 8px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
}

.submit-btn:hover::before {
  opacity: 1;
}

.submit-btn:hover svg {
  transform: translateX(4px);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Error */
.auth-error {
  margin-top: 16px;
  color: var(--danger);
  font-size: 13px;
  background: rgba(239, 68, 68, 0.06);
  padding: 12px 14px;
  border-radius: 8px;
  border-left: 3px solid var(--danger);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Footer */
.form-footer {
  margin-top: 24px;
}

.divider {
  text-align: center;
  position: relative;
  margin-bottom: 20px;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
}

.divider span {
  position: relative;
  background: white;
  padding: 0 16px;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.auth-switch {
  text-align: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.auth-switch a {
  color: var(--primary-light);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.auth-switch a:hover {
  color: var(--primary);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .auth-page {
    flex-direction: column;
  }

  .auth-hero {
    flex: none;
    min-height: 300px;
    padding: 36px 28px;
    align-items: flex-end;
  }

  .hero-title {
    font-size: 28px;
  }

  .hero-text {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .hero-features {
    gap: 6px;
  }

  .feature {
    font-size: 13px;
  }

  .shape-1 {
    width: 180px;
    height: 180px;
  }

  .shape-2 {
    width: 100px;
    height: 100px;
  }

  .auth-form-panel {
    width: 100%;
    min-width: unset;
    flex: 1;
    border-radius: 24px 24px 0 0;
    margin-top: -20px;
    position: relative;
    z-index: 3;
    box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
    max-height: none;
  }
}

@media (max-width: 480px) {
  .auth-hero {
    min-height: 240px;
    padding: 24px 20px;
  }

  .hero-badge {
    padding: 6px 14px;
    font-size: 12px;
    margin-bottom: 14px;
  }

  .hero-title {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .hero-text {
    display: none;
  }

  .hero-features {
    gap: 4px;
  }

  .feature {
    font-size: 12px;
  }

  .auth-form-panel {
    padding: 28px 20px;
    border-radius: 20px 20px 0 0;
  }

  .form-title {
    font-size: 22px;
  }

  .form-top {
    margin-bottom: 20px;
  }

  .input-group {
    margin-bottom: 12px;
  }

  .input-wrapper input {
    height: 42px;
    font-size: 13px;
  }

  .submit-btn {
    height: 44px;
    font-size: 14px;
  }
}
</style>