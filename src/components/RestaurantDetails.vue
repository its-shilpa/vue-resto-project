<template>
  <div v-if="restaurant" class="details-wrapper">
    <!-- HERO BANNER -->
    <div
      class="banner"
      :style="{ backgroundImage: `url(${restaurant.banner || restaurant.image || 'https://images.pexels.com/photos/11975899/pexels-photo-11975899.jpeg'})` }"
    >
      <!-- Floating Action Buttons -->
      <button class="banner-back-btn" @click="$router.back()" aria-label="Go back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        class="banner-fav-btn"
        :class="{ active: isFavorite }"
        @click="toggleFavorite"
        :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <svg viewBox="0 0 24 24" :fill="isFavorite ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" width="20" height="20">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      </button>

      <div class="banner-overlay">
        <div class="banner-content">
          <h1>{{ restaurant.name }}</h1>
          <p class="banner-meta">
            {{ restaurant.cuisine }} • ⭐ {{ averageRating }}
          </p>
        </div>
      </div>
    </div>

    <!-- Admin Banner Edit -->
    <div v-if="isAdmin" class="banner-edit page-container">
      <h3>Update Banner Image</h3>
      <div class="banner-edit-row">
        <input
          v-model="editableBanner"
          type="text"
          placeholder="Paste Banner Image URL (https://...)"
        />
        <button @click="updateBanner" :disabled="!editableBanner">
          Update Banner
        </button>
      </div>
    </div>

    <!-- INFO SECTION -->
    <div class="info-section page-container" data-aos="fade-up" data-aos-delay="100">
      <div class="info-card">
        <div class="info-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="20"
            height="20"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div class="info-text">
          <span class="info-label">Address</span>
          <span class="info-value">{{ restaurant.address }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-icon contact-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="20"
            height="20"
          >
            <path
              d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            />
          </svg>
        </div>
        <div class="info-text">
          <span class="info-label">Contact</span>
          <span class="info-value">{{ restaurant.contact }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="info-icon time-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="20"
            height="20"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div class="info-text">
          <span class="info-label">Opening Hours</span>
          <span class="info-value">{{ restaurant.openhour }}</span>
        </div>
      </div>
    </div>

    <!-- POPULAR DISHES -->
    <div class="dishes-section page-container" data-aos="fade-up">
      <div class="section-header">
        <h2>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="22"
            height="22"
          >
            <path
              d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
            />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          Popular Dishes
        </h2>
        <span class="dishes-count-badge" v-if="restaurant.popularDishes.length">
          {{ restaurant.popularDishes.length }} Items
        </span>
      </div>

      <!-- Admin Add Dish -->
      <div v-if="isAdmin" class="add-dish-card">
        <h3>{{ isEditingDish ? "Edit Dish" : "Add New Dish" }}</h3>

        <div class="add-dish-form">
          <input v-model="newDish.name" placeholder="Dish Name" />
          <input
            v-model="newDish.price"
            type="number"
            placeholder="Price (₹)"
          />
          <input
            v-model="newDish.image"
            placeholder="Image URL (https://...)"
          />
          <button
            class="primary-btn"
            @click="isEditingDish ? updateDish() : addDish()"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {{ isEditingDish ? "Update Dish" : "Add Dish" }}
          </button>
          <button
            v-if="isEditingDish"
            class="cancel-btn"
            @click="cancelEditDish"
          >
            Cancel
          </button>
        </div>
      </div>

      <Swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="1"
        :space-between="24"
        :navigation="restaurant.popularDishes.length > 4"
        :pagination="{ clickable: true }"
        :breakpoints="{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }"
        class="dishes-swiper"
      >
        <SwiperSlide
          v-for="(dish, index) in restaurant.popularDishes"
          :key="index"
        >
          <div class="dish-card" data-aos="fade-up" :data-aos-delay="index * 100">
            <!-- Image -->
            <div class="dish-image-wrap">
              <img :src="dish.image" :alt="dish.name" />
              <div class="dish-image-overlay"></div>
              <div class="dish-shine"></div>
            </div>
            <!-- Glass Info Panel -->
            <div class="dish-info-glass">
              <div class="dish-info-top">
                <h4>{{ dish.name }}</h4>
                <span class="dish-price-tag">₹{{ dish.price }}</span>
              </div>
              <div class="dish-info-bottom">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <span class="dish-popular-tag" v-if="dish.popular">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Popular
                  </span>
                  <span v-if="getDishRating(dish) > 0" class="dish-rating-tag" style="background: rgba(251, 191, 36, 0.15); color: #b45309; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 700; border: 1px solid rgba(251, 191, 36, 0.3); display: flex; align-items: center; gap: 4px;">
                    <span style="color: #f59e0b; font-size: 14px;">★</span> {{ getDishRating(dish) }}
                  </span>
                </div>
                <span style="flex:1"></span>
                <button class="add-cart-btn" @click.stop="addToCart(dish)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
            <!-- Admin Actions -->
            <div class="dish-admin-actions" v-if="isAdmin">
              <button class="edit-dish-btn" @click.stop="editDish(dish, index)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit
              </button>
              <button class="delete-dish-btn" @click.stop="confirmDeleteDish(index)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- REVIEWS -->
    <div class="review-section page-container" data-aos="fade-up">
      <div class="section-header">
        <h2>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="22"
            height="22"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
          Reviews
        </h2>
        <span v-if="restaurant?.reviews?.length" class="avg-badge">
          ⭐ {{ averageRating }} avg
        </span>
      </div>

      <!-- Add Review Form -->
      <div class="review-form-card">
        <h3>Write a Review</h3>
        <div class="review-form">
          <div class="form-input-wrap">
            <svg
              class="form-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              />
            </svg>
            <input
              v-model="newReview.comment"
              placeholder="Share your experience..."
            />
          </div>
          <div class="form-select-wrap">
            <select v-model="newReview.rating">
              <option disabled value="">Rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} ⭐</option>
            </select>
          </div>
          <button class="submit-btn" @click="addReview">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="16"
              height="16"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Submit
          </button>
        </div>
      </div>

      <!-- Review List -->
      <Swiper
        v-if="restaurant?.reviews?.length"
        :modules="[Navigation, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :navigation="restaurant.reviews.length > 3"
        :pagination="{ clickable: true }"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }"
        class="review-swiper"
      >
        <SwiperSlide v-for="(review, index) in restaurant.reviews" :key="index">
          <div class="review-card" data-aos="fade-up" :data-aos-delay="index * 100">
            <div class="review-header">
              <div class="review-avatar">
                {{ review.user?.charAt(0)?.toUpperCase() || "U" }}
              </div>
              <div class="review-rating-badge">
                <span class="review-rating-star">★</span>
                {{ review.rating }}.0
              </div>
            </div>

            <p class="review-comment">{{ review.comment }}</p>

            <div class="review-user">
              <strong>{{ review.user }}</strong>
            </div>

            <button
              v-if="isAdmin"
              class="delete-btn"
              @click="deleteReview(index)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="14"
                height="14"
              >
                <polyline points="3 6 5 6 21 6" />
                <path
                  d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                />
              </svg>
              Delete
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>

  <div v-else class="loading-state">
    <div class="spinner"></div>
    <p>Loading restaurant details...</p>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-box">
      <h3>Confirm Delete</h3>
      <p>Are you sure you want to delete this dish?</p>
      <div class="modal-actions">
        <button @click="deleteDish">Yes, Delete</button>
        <button @click="showDeleteModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import cartService from "@/services/cartService";

import { Navigation, Pagination } from "swiper/modules";

export default {
  name: "RestaurantDetails",

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      restaurant: null,
      isFavorite: false,
      Navigation,
      Pagination,
      newReview: {
        rating: "",
        comment: "",
      },
      newDish: {
        name: "",
        price: "",
        image: "",
      },
      editableBanner: "",
      isEditingDish: false,
      editingDishIndex: null,
      showDeleteModal: false,
      deleteIndex: null,
    };
  },

  async mounted() {
    const id = this.$route.params.id;

    try {
      const result = await API.get(`/resturent/${id}`);

      this.restaurant = result.data;

      if (!this.restaurant.reviews) {
        this.restaurant.reviews = [];
      }

      if (!this.restaurant.popularDishes) {
        this.restaurant.popularDishes = [];
      }

      this.checkFavorite();
    } catch (error) {
      console.error("Error loading details", error);
    }
  },
  methods: {
    async toggleFavorite() {
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (!loggedUser) {
        alert("Please login first");
        return;
      }

      let favorites = loggedUser.favorites || [];

      if (this.isFavorite) {
        favorites = favorites.filter((id) => id !== this.restaurant.id);
      } else {
        favorites.push(this.restaurant.id);
      }

      await API.patch(`/users/${loggedUser.id}`, {
        favorites,
      });

      loggedUser.favorites = favorites;
      localStorage.setItem("user", JSON.stringify(loggedUser));

      this.isFavorite = !this.isFavorite;
    },

    checkFavorite() {
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (!loggedUser || !loggedUser.favorites) {
        this.isFavorite = false;
        return;
      }

      this.isFavorite = loggedUser.favorites.includes(this.restaurant.id);
    },

    getDishRating(dish) {
      if (!dish.reviews || !dish.reviews.length) return 0;
      const total = dish.reviews.reduce((sum, r) => sum + Number(r.rating), 0);
      return (total / dish.reviews.length).toFixed(1);
    },

    async addReview() {
      if (!this.newReview.comment || !this.newReview.rating) return;

      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (!loggedUser) {
        alert("Please login first");
        return;
      }

      const reviewToAdd = {
        user: loggedUser.name,
        rating: this.newReview.rating,
        comment: this.newReview.comment,
      };

      const updatedReviews = [...(this.restaurant.reviews || []), reviewToAdd];

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { reviews: updatedReviews },
      );

      this.restaurant.reviews = updatedReviews;

      this.newReview = { rating: "", comment: "" };
    },

    async deleteReview(index) {
      const updatedReviews = [...this.restaurant.reviews];
      updatedReviews.splice(index, 1);

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { reviews: updatedReviews },
      );

      this.restaurant.reviews = updatedReviews;
    },

    async addDish() {
      if (!this.newDish.name || !this.newDish.price || !this.newDish.image) {
        alert("All fields required");
        return;
      }

      if (!this.newDish.image.startsWith("http")) {
        alert("Please enter a valid image URL");
        return;
      }

      const updatedDishes = [
        ...this.restaurant.popularDishes,
        { ...this.newDish, price: Number(this.newDish.price) },
      ];

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { popularDishes: updatedDishes },
      );

      this.restaurant.popularDishes = updatedDishes;
      this.resetDishForm();
    },

    editDish(dish, index) {
      this.newDish = { ...dish };
      this.isEditingDish = true;
      this.editingDishIndex = index;
    },

    async updateDish() {
      const updatedDishes = [...this.restaurant.popularDishes];

      updatedDishes[this.editingDishIndex] = {
        ...this.newDish,
        price: Number(this.newDish.price),
      };

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { popularDishes: updatedDishes },
      );

      this.restaurant.popularDishes = updatedDishes;
      this.resetDishForm();
    },

    confirmDeleteDish(index) {
      this.deleteIndex = index;
      this.showDeleteModal = true;
    },

    async deleteDish() {
      const updatedDishes = [...this.restaurant.popularDishes];
      updatedDishes.splice(this.deleteIndex, 1);

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { popularDishes: updatedDishes },
      );

      this.restaurant.popularDishes = updatedDishes;
      this.showDeleteModal = false;
    },

    resetDishForm() {
      this.newDish = { name: "", price: "", image: "" };
      this.isEditingDish = false;
      this.editingDishIndex = null;
    },

    cancelEditDish() {
      this.resetDishForm();
    },

    async updateBanner() {
      if (!this.editableBanner) {
        alert("Banner URL is required");
        return;
      }

      if (!this.editableBanner.startsWith("http")) {
        alert("Please enter a valid image URL");
        return;
      }

      await API.patch(
        `/resturent/${this.restaurant.id}`,
        { banner: this.editableBanner },
      );

      this.restaurant.banner = this.editableBanner;

      // ✅ Clear input field
      this.editableBanner = "";

      this.$nextTick(() => {
        alert("Banner updated successfully");
      });
    },

    //add to cart
    addToCart(dish) {
      const item = {
        id: dish.id || Date.now() + Math.random(), // ✅ ensure unique
        name: dish.name,
        price: dish.price,
        image: dish.image,
        restaurant: this.restaurant?.name || "Unknown" // ✅ important
      };

      cartService.addToCart(item);

      window.dispatchEvent(new Event("cart-updated"));
      window.$toast?.show("🛒 Added to cart!");
    },
  },
  computed: {
    isAdmin() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "admin";
    },

    averageRating() {
      if (!this.restaurant?.reviews?.length) return 0;

      const total = this.restaurant.reviews.reduce(
        (sum, r) => sum + Number(r.rating),
        0,
      );

      return (total / this.restaurant.reviews.length).toFixed(1);
    },
  },
};
</script>

<style scoped>
/* ===== Wrapper ===== */
.details-wrapper {
  padding-bottom: 60px;
  background: linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%);
  min-height: 100vh;
}

/* ===== Banner ===== */
.banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.85) 0%,
    rgba(30, 58, 138, 0.4) 40%,
    transparent 100%
  );
  display: flex;
  align-items: flex-end;
}

.banner-content {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 40px;
}

.banner-content h1 {
  font-size: 36px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.banner-meta {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

/* ===== Floating Banner Buttons ===== */
.banner-back-btn,
.banner-fav-btn {
  position: absolute;
  top: 20px;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.banner-back-btn {
  left: 20px;
}

.banner-fav-btn {
  right: 20px;
}

.banner-back-btn:hover,
.banner-fav-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  transform: scale(1.1);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
}

.banner-fav-btn.active {
  background: rgba(239, 68, 68, 0.85);
  color: white;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.4);
}

.banner-fav-btn.active:hover {
  background: rgba(239, 68, 68, 1);
  box-shadow: 0 8px 28px rgba(239, 68, 68, 0.5);
}

/* ===== Info Section ===== */
.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding-top: 0;
  padding-bottom: 40px;
  padding-top: 20px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 18px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
}

.info-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
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

.info-icon.contact-icon {
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1),
    rgba(52, 211, 153, 0.08)
  );
  color: #10b981;
}

.info-icon.time-icon {
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1),
    rgba(251, 191, 36, 0.08)
  );
  color: #f59e0b;
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
  line-height: 1.4;
}

/* ===== Section Header ===== */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header h2 svg {
  color: var(--primary-light);
}

.avg-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  background: linear-gradient(
    135deg,
    rgba(245, 158, 11, 0.1),
    rgba(251, 191, 36, 0.08)
  );
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  color: #d97706;
}

/* ===== Dishes Section ===== */
.dishes-section {
  padding-bottom: 48px;
}

.dishes-count-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.08));
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: #d97706;
  letter-spacing: 0.3px;
}

.dishes-swiper {
  padding-bottom: 48px;
}

/* --- Premium Dish Card --- */
.dish-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  height: 320px;
  /* background: #0f172a; */
  border: 2px solid transparent;
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

.dish-card::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 22px;
  padding: 2px;
  background: linear-gradient(135deg, transparent, transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: background 0.5s ease;
  z-index: 3;
  pointer-events: none;
}

.dish-card:hover::before {
  background: linear-gradient(135deg, #fbbf24, #f59e0b, #d97706, #f59e0b);
}

.dish-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 20px 50px rgba(245, 158, 11, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.25);
}

/* Rank Badge */
.dish-rank {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.45);
  text-transform: uppercase;
}

.dish-rank svg {
  color: white;
}

/* Image */
.dish-image-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.dish-image-wrap img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease;
}

.dish-card:hover .dish-image-wrap img {
  transform: scale(1.12);
  filter: brightness(0.85) saturate(1.2);
}

.dish-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.12) 50%,
    rgba(15, 23, 42, 0.75) 80%,
    rgba(15, 23, 42, 0.95) 100%
  );
  transition: background 0.4s ease;
  z-index: 1;
}

.dish-card:hover .dish-image-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.08) 40%,
    rgba(15, 23, 42, 0.7) 72%,
    rgba(15, 23, 42, 0.96) 100%
  );
}

/* Shine / Shimmer Effect */
.dish-shine {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.06) 45%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.06) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: none;
  pointer-events: none;
}

.dish-card:hover .dish-shine {
  animation: dish-shimmer 0.8s ease forwards;
}

@keyframes dish-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Glass Info Panel */
.dish-info-glass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  padding: 18px 20px 20px;
  background: rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transform: translateY(6px);
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              background 0.4s ease;
}

.dish-card:hover .dish-info-glass {
  transform: translateY(0);
  background: rgba(15, 23, 42, 0.5);
}

.dish-info-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}

.dish-info-glass h4 {
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1.25;
  letter-spacing: -0.2px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  flex: 1;
  min-width: 0;
}

.dish-price-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(217, 119, 6, 0.9));
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  color: white;
  white-space: nowrap;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  flex-shrink: 0;
}

.dish-info-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.dish-popular-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  background: rgba(251, 191, 36, 0.12);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #fbbf24;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dish-popular-tag svg {
  color: #fbbf24;
}

.dish-view-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.55);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-6px);
}

.dish-view-btn svg {
  transition: transform 0.3s ease;
}

.dish-card:hover .dish-view-btn {
  opacity: 1;
  transform: translateX(0);
  color: #fbbf24;
}

.dish-card:hover .dish-view-btn svg {
  transform: translateX(2px);
}

/* Admin Actions on Dish Card */
.dish-admin-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  bottom: auto;
  left: auto;
  transform: none;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
}

/* ===== Review Section ===== */
.review-section {
  padding-bottom: 48px;
}

.review-form-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 28px;
  margin-bottom: 32px;
}

.review-form-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.review-form {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.form-input-wrap {
  position: relative;
  flex: 1;
}

.form-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.review-form input {
  width: 100%;
  height: 48px;
  padding: 0 16px 0 40px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: rgba(248, 250, 252, 0.6);
  outline: none;
  transition: all 0.25s ease;
}

.review-form input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.form-select-wrap select {
  height: 48px;
  padding: 0 16px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: rgba(248, 250, 252, 0.6);
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;
  appearance: none;
  min-width: 110px;
}

.form-select-wrap select:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  height: 48px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.35);
}

/* ===== Review Swiper & Cards ===== */
.review-swiper {
  padding-bottom: 48px;
}

/* --- Review Card --- */
.review-card {
  position: relative;
  background: linear-gradient(165deg, #ffffff 0%, #f0f4ff 50%, #e8eeff 100%);
  border-radius: 22px;
  padding: 28px 26px 24px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow:
    0 8px 32px rgba(30, 64, 175, 0.07),
    0 2px 8px rgba(15, 23, 42, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Top shimmer border on hover */
.review-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 2;
}

/* Large decorative quote mark */
.review-card::after {
  content: "\201C";
  position: absolute;
  top: 60px;
  right: 20px;
  font-size: 80px;
  font-family: Georgia, "Times New Roman", serif;
  color: rgba(59, 130, 246, 0.06);
  line-height: 1;
  pointer-events: none;
  transition: color 0.4s ease;
}

.review-card:hover {
  transform: translateY(-8px) scale(1.01);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow:
    0 24px 56px rgba(30, 64, 175, 0.14),
    0 8px 20px rgba(59, 130, 246, 0.08),
    0 0 0 1px rgba(99, 102, 241, 0.12);
}

.review-card:hover::before {
  opacity: 1;
  animation: shimmerLine 2s linear infinite;
}

.review-card:hover::after {
  color: rgba(59, 130, 246, 0.1);
}

@keyframes shimmerLine {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* --- Review Header (avatar + rating) --- */
.review-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.review-avatar {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(30, 64, 175, 0.35);
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.review-rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  background: linear-gradient(135deg, #059669, #10b981);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(5, 150, 105, 0.35);
  letter-spacing: 0.3px;
}

.review-rating-star {
  font-size: 13px;
  line-height: 1;
}

/* --- Review Comment --- */
.review-comment {
  flex: 1;
  font-size: 14px;
  line-height: 1.75;
  color: #475569;
  font-style: italic;
  position: relative;
  z-index: 1;
}

/* --- Review User Info --- */
.review-user {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(99, 102, 241, 0.08);
}

.review-user strong {
  color: #1e293b;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.1px;
}

/* --- Delete Button --- */
.delete-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.25s ease;
  align-self: flex-start;
  position: relative;
  z-index: 3;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* ===== Loading ===== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border);
  border-top-color: var(--primary-light);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .banner {
    height: 300px;
  }

  .banner-content {
    padding: 32px 24px;
  }

  .banner-content h1 {
    font-size: 28px;
  }

  .banner-back-btn,
  .banner-fav-btn {
    width: 40px;
    height: 40px;
    top: 16px;
  }

  .banner-back-btn {
    left: 16px;
  }

  .banner-fav-btn {
    right: 16px;
  }

  .info-section {
    grid-template-columns: 1fr;
    gap: 14px;
    padding-bottom: 28px;
  }

  .info-card {
    padding: 18px;
    border-radius: 14px;
  }

  .info-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }

  .info-value {
    font-size: 14px;
  }

  .dishes-section,
  .review-section {
    padding-top: 0;
    padding-bottom: 28px;
  }

  .section-header h2 {
    font-size: 18px;
  }

  .review-form {
    flex-direction: column;
  }

  .review-form-card {
    padding: 20px;
  }

  .form-input-wrap input,
  .form-select-wrap select {
    min-width: 0;
    width: 100%;
  }

  .submit-btn {
    justify-content: center;
  }

  .banner-edit {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
  }

  .add-dish-card {
    padding: 20px;
  }

  .add-dish-form {
    flex-direction: column;
    align-items: stretch;
  }

  .add-dish-form input {
    min-width: 0;
    width: 100%;
    flex: none;
  }

  .add-dish-form .primary-btn,
  .add-dish-form .cancel-btn {
    width: 100%;
    justify-content: center;
  }

  .dish-admin-actions {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 240px;
  }

  .banner-content {
    padding: 20px 16px;
  }

  .banner-content h1 {
    font-size: 22px;
  }

  .banner-meta {
    font-size: 13px;
  }

  .banner-back-btn,
  .banner-fav-btn {
    width: 36px;
    height: 36px;
    top: 12px;
  }

  .banner-back-btn {
    left: 12px;
  }

  .banner-back-btn svg,
  .banner-fav-btn svg {
    width: 16px;
    height: 16px;
  }

  .banner-fav-btn {
    right: 12px;
  }

  .info-section {
    gap: 12px;
    padding-bottom: 20px;
  }

  .info-card {
    padding: 14px;
    border-radius: 12px;
    gap: 12px;
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

  .info-label {
    font-size: 10px;
  }

  .info-value {
    font-size: 13px;
  }

  .dishes-section,
  .review-section {
    padding-bottom: 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .section-header h2 {
    font-size: 16px;
    gap: 8px;
  }

  .review-card {
    padding: 16px;
    border-radius: 14px;
  }

  .review-comment {
    font-size: 13px;
  }

  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .banner-edit {
    padding: 16px;
    border-radius: 14px;
  }

  .add-dish-card {
    padding: 16px;
    border-radius: 14px;
  }

  .modal-box {
    padding: 24px;
    border-radius: 16px;
  }

  .modal-actions {
    flex-direction: column;
  }
}

/* ===== Admin: Banner Edit ===== */
.banner-edit {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 20px 24px;
  margin-top: 20px;
}

.banner-edit h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.banner-edit-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.banner-edit input {
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 14px;
  border: 2px solid var(--border);
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: var(--text-primary);
  background: rgba(248, 250, 252, 0.6);
  color: #1e293b;
  outline: none;
  transition: all 0.25s ease;
}

.banner-edit input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

/* ===== Banner edit placeholder fix ===== */
.banner-edit input::placeholder {
  color: #94a3b8;
  font-size: 13px;
  font-style: italic;
}

.banner-edit button {
  height: 42px;
  padding: 0 20px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.banner-edit button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.35);
}

@media (max-width: 600px) {
  .banner-edit {
    padding: 16px;
    border-radius: 14px;
    margin-top: 16px;
  }
  .banner-edit h3 {
    font-size: 13px;
    margin-bottom: 10px;
  }
  .banner-edit-row {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .banner-edit input {
    height: 40px;
    font-size: 12px;
    flex: unset !important;
  }
  .banner-edit button {
    height: 40px;
    font-size: 12px;
    width: 100%;
  }
}

.banner-edit input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.banner-edit button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.35);
}

/* ===== Admin: Add / Edit Dish Card ===== */
.add-dish-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 24px 28px;
  margin-bottom: 24px;
}

.add-dish-card h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.add-dish-form {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.add-dish-form input {
  flex: 1;
  min-width: 160px;
  height: 44px;
  padding: 0 16px;
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  background: rgba(248, 250, 252, 0.6);
  outline: none;
  transition: all 0.25s ease;
}

.add-dish-form input:focus {
  border-color: var(--primary-light);
  background: white;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.add-dish-form .primary-btn {
  height: 44px;
  padding: 0 24px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(30, 64, 175, 0.2);
}

.add-dish-form .primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.4);
}

.add-dish-form .cancel-btn {
  height: 44px;
  padding: 0 22px;
  background: transparent;
  color: var(--text-muted);
  border: 2px solid var(--border);
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.cancel-btn:hover {
  border-color: var(--text-muted);
  background: var(--bg-card-alt);
}

.edit-dish-btn,
.delete-dish-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 13px;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(255,255,255,0.18);
  white-space: nowrap;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  line-height: 1.2;
  letter-spacing: 0.2px;
}

.edit-dish-btn {
  background: rgba(30, 30, 30, 0.72);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.edit-dish-btn:hover {
  background: rgba(245, 158, 11, 0.88);
  border-color: rgba(245,158,11,0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
}

.delete-dish-btn {
  background: rgba(30, 30, 30, 0.72);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.delete-dish-btn:hover {
  background: rgba(239, 68, 68, 0.88);
  border-color: rgba(239,68,68,0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

/* ===== Delete Confirmation Modal ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-box {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(15, 23, 42, 0.2);
  padding: 32px;
  width: 380px;
  max-width: 90vw;
  text-align: center;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-box h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.modal-box p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.modal-actions button {
  flex: 1;
  height: 44px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
}

.modal-actions button:first-child {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: white;
}

.modal-actions button:first-child:hover {
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.35);
  transform: translateY(-2px);
}

.modal-actions button:last-child {
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--border);
}

.modal-actions button:last-child:hover {
  border-color: var(--text-muted);
  background: var(--bg-card-alt);
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .banner {
    height: 280px;
  }
  .banner-content {
    padding: 32px 24px;
  }
  .banner-content h1 {
    font-size: 28px;
  }
  .banner-meta {
    font-size: 14px;
  }
  .action-bar {
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
  }
  .back-btn, .favorite-btn {
    width: 100%;
    justify-content: center;
  }
  .info-section {
    grid-template-columns: 1fr;
    gap: 14px;
    padding-bottom: 28px;
  }
  .info-card {
    padding: 18px;
    border-radius: 14px;
  }
  .info-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
  .info-value {
    font-size: 14px;
  }
  .dishes-section, .review-section {
    padding-top: 0;
    padding-bottom: 28px;
  }
  .section-header h2 {
    font-size: 18px;
  }
  .review-form {
    flex-direction: column;
  }
  .review-form-card {
    padding: 20px;
  }
  .form-input-wrap input {
    min-width: 0;
  }

  .banner-edit {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
  }
  .banner-edit input {
    min-width: 0;
  }
  .add-dish-card {
    padding: 20px;
  }
  .add-dish-form {
    flex-direction: column;
    align-items: stretch;
  }
  .add-dish-form input {
    min-width: 0;
    width: 100%;
    flex: none;
  }
  .add-dish-form .primary-btn,
  .add-dish-form .cancel-btn {
    width: 100%;
    justify-content: center;
  }
  .dish-admin-actions {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .banner {
    height: 220px;
  }
  .banner-content {
    padding: 24px 16px;
  }
  .banner-content h1 {
    font-size: 22px;
  }
  .banner-meta {
    font-size: 13px;
  }
  .info-card {
    padding: 14px;
    border-radius: 12px;
    gap: 12px;
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
  .info-label {
    font-size: 10px;
  }
  .info-value {
    font-size: 13px;
  }
  .section-header h2 {
    font-size: 16px;
    gap: 8px;
  }
  .section-header h2 svg {
    width: 18px;
    height: 18px;
  }
  .review-card {
    padding: 16px;
    border-radius: 14px;
  }
  .review-comment {
    font-size: 13px;
  }
  .submit-btn {
    width: 100%;
    justify-content: center;
  }

  .banner-edit {
    padding: 16px;
    border-radius: 14px;
    margin-bottom: 15px;
  }
  .add-dish-card {
    padding: 16px;
    border-radius: 14px;
  }
  .modal-box {
    padding: 24px;
    border-radius: 16px;
  }
  .modal-actions {
    flex-direction: column;
  }
}

.add-cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.add-cart-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.add-cart-btn svg {
  margin-top: -1px;
}
</style>

