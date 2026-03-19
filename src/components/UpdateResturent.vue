<template>
  <div class="form-page">
    <!-- Hero -->
    <section class="form-hero">
      <div class="form-hero-bg"></div>
      <div class="form-hero-content">
        <router-link to="/admin-dashboard" class="back-link">
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
          Back to Dashboard
        </router-link>
        <h1 class="form-hero-title">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="28"
            height="28"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Update Restaurant
        </h1>
        <p class="form-hero-sub">Modify the restaurant details below</p>
      </div>
    </section>

    <!-- Form -->
    <section class="form-content page-container">
      <div class="form-card" data-aos="fade-up">
        <div class="input-group">
          <label>Restaurant Name</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
              />
            </svg>
            <input
              v-model.trim="name"
              type="text"
              placeholder="Restaurant name"
            />
          </div>
          <p v-if="errors.name" class="error">{{ errors.name }}</p>
        </div>
        <div class="input-group">
          <label>Contact Number</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
              />
            </svg>
            <input
              v-model.trim="contact"
              type="text"
              placeholder="Contact number"
            />
          </div>
          <p v-if="errors.contact" class="error">{{ errors.contact }}</p>
        </div>
        <div class="input-group">
          <label>Address</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input v-model.trim="address" type="text" placeholder="Address" />
          </div>
          <p v-if="errors.address" class="error">{{ errors.address }}</p>
        </div>
        <div class="input-group">
          <label>Opening Hours</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <input
              v-model.trim="openhour"
              type="text"
              placeholder="e.g. 10AM - 8PM"
            />
          </div>
        </div>
        <div class="input-group">
          <label>Restaurant Image URL</label>
          <div class="input-wrapper">
            <svg
              class="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <input v-model.trim="image" type="text" placeholder="Image URL" />
          </div>
        </div>
        <p v-if="errors.image" class="error">{{ errors.image }}</p>

        <!-- Preview -->
        <img
          v-if="image"
          :src="image"
          style="width: 100%; margin-top: 10px; border-radius: 10px"
        />
        <button class="submit-btn" :disabled="loading" @click="updateResturent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="18"
            height="18"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          {{ loading ? "Saving..." : "Save Changes" }}
        </button>
        <p v-if="errors.general" class="error">{{ errors.general }}</p>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "UpdateResturent",
  data() {
    return {
      name: "",
      contact: "",
      address: "",
      openhour: "",
      image: "",
      loading: false,
      errors: {
        name: "",
        contact: "",
        address: "",
        general: "",
      },
    };
  },
  async mounted() {
    try {
      const result = await API.get(
        `/resturent/${this.$route.params.id}`,
      );
      this.name = result.data.name || "";
      this.contact = result.data.contact || "";
      this.address = result.data.address || "";
      this.openhour = result.data.openhour || "";
      this.image = result.data.image || "";
    } catch (error) {
      console.error("Failed to load restaurant:", error);
      this.errors.general = "Failed to load restaurant details.";
    }
  },
  methods: {
    validate() {
      let valid = true;
      this.errors = { name: "", contact: "", address: "", general: "" };

      if (!this.name.trim()) {
        this.errors.name = "Restaurant name is required";
        valid = false;
      }

      const phoneRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
      if (!this.contact.trim()) {
        this.errors.contact = "Contact number is required";
        valid = false;
      } else if (!phoneRegex.test(this.contact.trim())) {
        this.errors.contact = "Enter a valid Indian phone number";
        valid = false;
      }

      if (!this.address.trim()) {
        this.errors.address = "Address is required";
        valid = false;
      }

      // ✅ Image validation
      if (!this.image.trim()) {
        this.errors.image = "Restaurant image URL is required";
        valid = false;
      } else if (!this.isValidImageUrl(this.image.trim())) {
        this.errors.image = "Enter a valid image URL (jpg, png, webp)";
        valid = false;
      }

      return valid;
    },

    isValidImageUrl(url) {
      const pattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))/i;
      return pattern.test(url);
    },

    async updateResturent() {
      if (!this.validate()) return;

      this.loading = true;
      this.errors.general = "";

      try {
        await API.put(
          `/resturent/${this.$route.params.id}`,
          {
            name: this.name.trim(),
            contact: this.contact.trim(),
            address: this.address.trim(),
            openhour: this.openhour.trim(),
            image: this.image.trim(),
          },
        );
        this.$router.push({ name: "AdminDashboard" });
      } catch (error) {
        console.error("Update failed:", error);
        this.errors.general = "Failed to update restaurant. Try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.form-hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  padding: 36px 24px 40px;
  overflow: hidden;
}

.form-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 80% 30%,
    rgba(59, 130, 246, 0.2),
    transparent 60%
  );
}

.form-hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin-bottom: 16px;
  transition: color 0.2s;
}

.back-link:hover {
  color: white;
}

.form-hero-title {
  font-size: 28px;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.form-hero-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Form */
.form-content {
  margin-top: -20px;
  padding-bottom: 48px;
  position: relative;
  z-index: 3;
}

.form-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 20px;
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
}

.input-wrapper input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 42px;
  border: 2px solid var(--border);
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: var(--bg-card-alt);
  transition: all 0.25s ease;
  outline: none;
}

.input-wrapper input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  width: 100%;
  height: 50px;
  margin-top: 8px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
}

.error {
  color: #dc2626;
  font-size: 12px;
  margin-top: 6px;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* Responsive */
@media (max-width: 768px) {
  .form-hero {
    padding: 28px 16px 36px;
  }

  .form-hero-title {
    font-size: 22px;
  }

  .form-content {
    padding-bottom: 40px;
  }

  .form-card {
    padding: 24px 20px;
  }
}

@media (max-width: 480px) {
  .form-hero-title {
    font-size: 20px;
  }

  .input-wrapper input {
    height: 44px;
  }

  .submit-btn {
    height: 46px;
  }
}
</style>
