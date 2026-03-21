<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content" data-aos="fade-down" data-aos-duration="1000">
        <!-- <div class="hero-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Trusted Platform
        </div> -->
        <h1 class="hero-title">
          Welcome, <span class="hero-name">{{ name }}</span>
        </h1>
        <p class="hero-subtitle">
          Discover and manage restaurants in our growing network
        </p>
        <div class="hero-search">
          <svg
            class="hero-search-icon"
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
            placeholder="Search restaurants by name or location..."
          />
        </div>
        <div class="hero-stats" v-if="!loading">
          <div class="hero-stat">
            <span class="hero-stat-num">{{ resturent.length }}</span>
            <span class="hero-stat-label">Restaurants</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat-num">{{ totalPages }}</span>
            <span class="hero-stat-label">Pages</span>
          </div>
          <div class="hero-stat-divider"></div>
          <div class="hero-stat">
            <span class="hero-stat-num">{{ filteredRestaurants.length }}</span>
            <span class="hero-stat-label">Results</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section
      v-if="search && (filteredRestaurants.length || filteredDishes.length)"
      class="search-section page-container"
    >
      <!-- Restaurant Results -->
      <div v-if="filteredRestaurants.length">
        <h2 class="search-title" data-aos="fade-right">Restaurants</h2>

        <div class="restaurant-grid">
          <div
            v-for="item in filteredRestaurants"
            :key="'s-r-' + item.id"
            class="restaurant-card"
            @click="
              $router.push({
                name: 'RestaurantDetails',
                params: { id: item.id },
              })
            "
          >
            <div
              class="card-image"
              :style="{
                backgroundImage: item.image
                  ? `url(${item.image})`
                  : `url(https://via.placeholder.com/400x300?text=No+Image)`,
              }"
            ></div>

            <div class="restaurant-info">
              <h3 class="restaurant-name" v-html="highlight(item.name)"></h3>
              <p class="restaurant-detail">
                <span v-html="highlight(item.address)"></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Dish Results -->
      <div v-if="filteredDishes.length">
        <h2 class="search-title" data-aos="fade-right">Dishes</h2>

        <div class="restaurant-grid">
          <div
            v-for="(dish, index) in filteredDishes"
            :key="'s-d-' + index"
            class="dish-card"
          >
            <div class="dish-image-wrap">
              <img :src="dish.image" />
            </div>

            <div class="dish-info">
              <h4 v-html="highlight(dish.name)"></h4>
              <span class="dish-price">₹ {{ dish.price }}</span>
              <p
                class="dish-restaurant"
                v-html="highlight(dish.restaurant)"
              ></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section
      v-if="!search"
      class="about-section page-container"
      data-aos="fade-up"
    >
      <div class="about-grid">
        <!-- Left Content -->
        <div class="about-content" data-aos="fade-right" data-aos-delay="100">
          <h2 class="about-title">About Our Platform</h2>
          <p class="about-desc">
            Our restaurant management platform helps users discover, explore,
            and manage restaurants effortlessly. Whether you're searching for a
            great place to eat or managing restaurant listings, our system
            provides a seamless experience.
          </p>

          <div class="about-features">
            <div class="about-feature">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span>Discover restaurants easily</span>
            </div>

            <div class="about-feature">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Manage restaurant listings</span>
            </div>

            <div class="about-feature">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Search by name or location instantly</span>
            </div>
          </div>
        </div>

        <!-- Right Image -->
        <div class="about-image" data-aos="fade-left" data-aos-delay="200">
          <img
            src="https://images.pexels.com/photos/4760721/pexels-photo-4760721.jpeg"
            alt="Restaurant"
          />
        </div>
      </div>
    </section>

    <!-- Content -->
    <section v-if="!search" class="content-section page-container">
      <!-- Loading -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading restaurants...</p>
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
            <path
              d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
            />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>
        <h3>No restaurants found</h3>
        <p>Try adjusting your search terms</p>
      </div>

      <!-- Cards -->
      <div data-aos="fade-up">
        <h2 class="resto-card-head">Our Propular Resturants</h2>
      </div>
      <div
        class="restaurant-grid"
        v-if="!loading && filteredRestaurants.length"
      >
        <div
          v-for="(item, index) in paginatedRestaurants"
          :key="item.id"
          class="restaurant-card"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
          @click="
            $router.push({ name: 'RestaurantDetails', params: { id: item.id } })
          "
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
              <!-- <div class="card-badge">#{{ item.id }}</div> -->
            </div>
            <div class="restaurant-info">
              <h3 class="restaurant-name">{{ item.name }}</h3>
              <div class="restaurant-detail">
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
                <span>{{ item.address }}</span>
              </div>
              <div class="restaurant-detail">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="14"
                  height="14"
                >
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                  />
                </svg>
                <span>{{ item.contact }}</span>
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

    <!-- Popular Dishes Section -->
    <section v-if="!search" class="home-dishes page-container">
      <div class="section-header" data-aos="fade-up">
        <h2>Popular Dishes</h2>
        <p>Most loved dishes from our restaurants</p>
      </div>

      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 2500, disableOnInteraction: false }"
        :breakpoints="{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }"
        class="home-dishes-swiper"
      >
        <SwiperSlide v-for="(dish, index) in allPopularDishes" :key="index">
          <div class="dish-card">
            <!-- Favorite Icon -->
            <button
              class="dish-fav-btn"
              :class="{ active: isDishFavorite(dish) }"
              @click.stop="toggleDishFavorite(dish)"
            >
              ❤
            </button>

            <div class="dish-image-wrap">
              <img :src="dish.image" :alt="dish.name" />
              <div class="dish-image-overlay"></div>
              <span class="dish-price-badge">₹ {{ dish.price }}</span>
            </div>

            <div class="dish-info">
              <h4>{{ dish.name }}</h4>
              <p class="dish-restaurant">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="13"
                  height="13"
                >
                  <path
                    d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                  />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                {{ dish.restaurant }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Stats Section -->
    <section v-if="!search" class="stats-section page-container">
      <div class="stats-container" data-aos="fade-right">
        <div class="stat-card">
          <div class="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="28"
              height="28"
            >
              <path
                d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
              />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <h3 class="stat-number">{{ restaurantCount }}+</h3>
          <p class="stat-label">Restaurants</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="28"
              height="28"
            >
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <h3 class="stat-number">{{ usersCount }}k+</h3>
          <p class="stat-label">Happy Users</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="28"
              height="28"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <h3 class="stat-number">{{ citiesCount }}+</h3>
          <p class="stat-label">Cities Covered</p>
        </div>
      </div>
    </section>

    <!-- Special Offers Section -->
    <section v-if="!search" class="offers-banner-section page-container">
      <div class="section-header" data-aos="fade-left">
        <h2>Special Offers</h2>
        <p>Don't miss these exclusive deals</p>
      </div>

      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        class="offers-swiper"
      >
        <!-- Banner 1 -->
        <SwiperSlide>
          <div
            class="offer-banner"
            style="
              background-image: url('https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg');
            "
          >
            <div class="offer-overlay"></div>

            <div class="offer-banner-content">
              <span class="offer-tag">🔥 20% OFF</span>

              <h2>Fast Food Festival</h2>

              <p>Get 20% off on burgers and fries this weekend</p>

              <button class="offer-btn">Explore Now</button>
            </div>
          </div>
        </SwiperSlide>

        <!-- Banner 2 -->
        <SwiperSlide>
          <div
            class="offer-banner"
            style="
              background-image: url('https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg');
            "
          >
            <div class="offer-overlay"></div>

            <div class="offer-banner-content">
              <span class="offer-tag">BUY 1 GET 1</span>

              <h2>Nonveg Lovers Deal</h2>

              <p>Buy one pizza and get another free</p>

              <button class="offer-btn">Grab Deal</button>
            </div>
          </div>
        </SwiperSlide>

        <!-- Banner 3 -->
        <SwiperSlide>
          <div
            class="offer-banner"
            style="
              background-image: url('https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg');
            "
          >
            <div class="offer-overlay"></div>

            <div class="offer-banner-content">
              <span class="offer-tag">FREE DELIVERY</span>

              <h2>Italian Specials</h2>

              <p>Free delivery on Italian restaurants today</p>

              <button class="offer-btn">Order Now</button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- Customer Reviews -->
    <section v-if="!search" class="reviews-section page-container">
      <div class="section-header" data-aos="fade-up">
        <h2>What Our Customers Say</h2>
        <p>Real reviews from our restaurant visitors</p>
      </div>

      <Swiper
        :modules="[Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }"
        class="reviews-swiper"
      >
        <SwiperSlide v-for="(review, index) in allReviews" :key="index">
          <div class="review-card">
            <div class="review-header">
              <div class="review-avatar">
                {{ review.user ? review.user.charAt(0).toUpperCase() : "U" }}
              </div>
              <div class="review-rating-badge">
                <span class="review-rating-star">★</span>
                {{ review.rating }}.0
              </div>
            </div>

            <p class="review-text">
              {{ review.comment }}
            </p>

            <div class="review-user">
              <strong>{{ review.user }}</strong>
              <span class="review-restaurant-tag">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  width="12"
                  height="12"
                >
                  <path
                    d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"
                  />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                {{ review.restaurant }}
              </span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- CTA Section -->
    <section class="cta-section page-container" data-aos="fade-right">
      <div class="cta-card">
        <div class="cta-decoration">
          <div class="cta-circle cta-circle-1"></div>
          <div class="cta-circle cta-circle-2"></div>
          <div class="cta-circle cta-circle-3"></div>
          <div class="cta-emoji cta-emoji-1">🍕</div>
          <div class="cta-emoji cta-emoji-2">🍔</div>
          <div class="cta-emoji cta-emoji-3">🍜</div>
          <div class="cta-emoji cta-emoji-4">🥗</div>
        </div>
        <div class="cta-content">
          <span class="cta-badge">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              width="14"
              height="14"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Trusted by thousands
          </span>
          <h2>Ready to Discover<br />Amazing Food?</h2>
          <p>
            Join our growing community of food lovers. Explore hundreds of
            restaurants, discover unique dishes, and share your favorites.
          </p>
          <div class="cta-buttons">
            <button
              class="cta-primary"
              @click="$router.push('/all-restaurants')"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                width="18"
                height="18"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Explore Restaurants
            </button>
            <button class="cta-secondary" @click="$router.push('/profile')">
              View Your Profile
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from "axios";
import API from "@/services/api";
import AOS from "aos";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";

export default {
  name: "HomePage",
  data() {
    return {
      name: "",
      resturent: [],
      loading: false,
      error: null,
      search: "",
      currentPage: 1,
      perPage: 9,

      restaurantCount: 0,
      usersCount: 0,
      citiesCount: 0,

      allPopularDishes: [],
      favoriteDishes: [],
      allReviews: [],
      Autoplay,
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },

  async mounted() {
    this.loadData();
    this.getResturent();

    this.animateCounter("restaurantCount", 200);
    this.animateCounter("usersCount", 10);
    this.animateCounter("citiesCount", 20);

    this.getPopularDishes();

    this.getAllReviews();

    this.$nextTick(() => {
      AOS.refresh();
    });

    const user = JSON.parse(localStorage.getItem("user"));
    this.favoriteDishes = user?.favoriteDishes || [];
  },

  methods: {
    //Resturant Cards
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

    async loadData() {
      const user = localStorage.getItem("user");

      if (!user) {
        this.$router.push({ name: "SignUp" });
        return;
      }

      try {
        const parsedUser = JSON.parse(user);
        this.name = parsedUser.name || "";
      } catch (e) {
        console.error("Invalid user data", e);
      }
    },

    //Stats Section
    animateCounter(target, value) {
      let start = 0;
      const duration = 1500;
      const step = Math.ceil(value / (duration / 16));
      const counter = setInterval(() => {
        start += step;
        if (start >= value) {
          start = value;
          clearInterval(counter);
        }
        this[target] = start;
      }, 16);
    },

    //Popular Dishes Section
    async getPopularDishes() {
      try {
        const result = await API.get("/resturent");
        const dishes = [];
        result.data.forEach((restaurant) => {
          if (restaurant.popularDishes) {
            restaurant.popularDishes.forEach((dish) => {
              dishes.push({
                ...dish,
                restaurant: restaurant.name,
              });
            });
          }
        });
        this.allPopularDishes = dishes;
      } catch (error) {
        console.log("Dish loading error");
      }
    },

    toggleDishFavorite(dish) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const index = this.favoriteDishes.findIndex((d) => d.name === dish.name);

      if (index > -1) {
        this.favoriteDishes.splice(index, 1);
      } else {
        this.favoriteDishes.push(dish);
      }

      user.favoriteDishes = this.favoriteDishes;

      localStorage.setItem("user", JSON.stringify(user));
    },

    isDishFavorite(dish) {
      return this.favoriteDishes.some((d) => d.name === dish.name);
    },

    highlight(text) {
      if (!text) return "";
      if (!this.search) return text;
      const regex = new RegExp(`(${this.search})`, "gi");
      return text.replace(regex, `<span class="search-highlight">$1</span>`);
    },

    //Review Sec
    async getAllReviews() {
      try {
        const result = await API.get("/resturent");
        const reviews = [];
        result.data.forEach((restaurant) => {
          if (restaurant.reviews) {
            restaurant.reviews.forEach((review) => {
              reviews.push({
                ...review,
                restaurant: restaurant.name,
              });
            });
          }
        });
        this.allReviews = reviews;
      } catch (error) {
        console.log("Review loading error");
      }
    },
  },

  computed: {
    filteredRestaurants() {
      return this.resturent.filter(
        (item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) ||
          item.address.toLowerCase().includes(this.search.toLowerCase()),
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

    filteredDishes() {
      if (!this.search.trim()) return [];

      return this.allPopularDishes.filter(
        (d) =>
          d.name.toLowerCase().includes(this.search.toLowerCase()) ||
          d.restaurant.toLowerCase().includes(this.search.toLowerCase()),
      );
    },
  },

  watch: {
    search() {
      this.currentPage = 1;
    },
    $route() {
      this.getResturent();
    },
  },

  activated() {
    this.getResturent();
  },
};
</script>

<style scoped>
/* ===== Hero ===== */
.hero {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  padding: 50px 24px 48px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 70% 20%,
      rgba(59, 130, 246, 0.2),
      transparent 60%
    ),
    radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.1), transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  color: white;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}

.hero-name {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 28px;
}

.hero-search {
  position: relative;
  max-width: 520px;
  margin: 0 auto 28px;
}

.hero-search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.hero-search input {
  width: 100%;
  height: 52px;
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

@media (max-width: 480px ) {
  .hero-search input {
    width: 90%;
  }
}

.hero-search input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.hero-search input:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.hero-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hero-stat-num {
  font-size: 20px;
  font-weight: 700;
  color: white;
}

.hero-stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.hero-stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.15);
}

.content-section {
  position: relative;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(59, 130, 246, 0.08),
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 10%,
      rgba(99, 102, 241, 0.08),
      transparent 45%
    ),
    radial-gradient(
      circle at 50% 100%,
      rgba(245, 158, 11, 0.06),
      transparent 40%
    ),
    linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-radius: 28px;
  padding: 48px 0px 60px;
  margin-top: -40px;
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
  background: var(--bg-card-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: var(--text-muted);
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

.resto-card-head {
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.restaurant-grid {
  position: relative;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.restaurant-card {
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 18px;
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease,
    border-color 0.35s ease;
  cursor: pointer;
}

/* Glow layer */
.restaurant-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top,
    rgba(59, 130, 246, 0.25),
    transparent 60%
  );
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
  box-shadow: 0 20px 50px rgba(30, 64, 175, 0.25),
    0 0 0 1px rgba(59, 130, 246, 0.25);
}

.restaurant-card:hover .card-image {
  transform: scale(1.06);
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

/* Cinematic overlay */
.card-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.35) 75%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 10px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border-radius: 999px;
  color: white;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.45);
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

/* ===== Loading / Error / Empty (Optional polish) ===== */
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

.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-icon-wrap {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: var(--bg-card-alt);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: var(--text-muted);
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

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero {
    padding: 36px 24px 60px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: 26px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .hero-search {
    max-width: 100%;
  }

  .hero-search input {
    height: 46px;
    font-size: 13px;
  }

  .hero-stats {
    gap: 14px;
    padding: 12px 20px;
  }

  .hero-stat-num {
    font-size: 17px;
  }

  .content-section {
    padding: 40px 0px 40px;
    border-radius: 24px;
    margin-top: -36px;
  }

  .restaurant-grid {
    padding: 16px;
    border-radius: 20px;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
  }

  .restaurant-card {
    border-radius: 14px;
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

  .restaurant-detail {
    font-size: 12px;
    gap: 6px;
  }

  .pagination {
    gap: 4px;
  }

  .page-btn {
    min-width: 36px;
    height: 36px;
    font-size: 12px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 28px 16px 52px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-title {
    font-size: 22px;
  }

  .hero-subtitle {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .hero-search {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .hero-search input {
    height: 44px;
    font-size: 13px;
    border-radius: 12px;
    padding: 0 16px 0 44px;
  }

  .hero-stats {
    gap: 12px;
    padding: 10px 16px;
    border-radius: 10px;
  }

  .hero-stat-num {
    font-size: 16px;
  }

  .hero-stat-label {
    font-size: 10px;
  }

  .hero-stat-divider {
    height: 24px;
  }

  .content-section {
    padding: 40px 0px 40px;
    border-radius: 20px;
    margin-top: -32px;
  }

  .restaurant-grid {
    padding: 12px;
    border-radius: 16px;
    grid-template-columns: 1fr;
    gap: 14px;
    backdrop-filter: blur(8px);
  }

  .restaurant-card {
    border-radius: 14px;
  }

  .restaurant-card:hover {
    transform: translateY(-6px) scale(1.01);
  }

  .restaurant-card::before {
    background: radial-gradient(
      circle at top,
      rgba(59, 130, 246, 0.15),
      transparent 60%
    );
  }

  .card-image {
    height: 180px;
  }

  .restaurant-info {
    padding: 14px;
  }

  .restaurant-name {
    font-size: 15px;
    margin-bottom: 8px;
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

/* About section css */
/* ===== About Section ===== */

.about-section {
  padding: 70px 0px;
  margin-top: -20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.about-title {
  font-size: 30px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.about-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 28px;
}

.about-features {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.about-feature {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.about-feature svg {
  width: 18px;
  height: 18px;
  color: #3b82f6;
}

.about-image {
  position: relative;
}

.about-image img {
  width: 100%;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: transform 0.4s ease;
}

.about-image img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .about-section {
    padding: 50px 0px;
  }
  .about-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .about-title {
    font-size: 24px;
  }
  .about-desc {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .about-section {
    padding: 40px 0px;
  }
  .about-title {
    font-size: 20px;
    margin-bottom: 12px;
  }
  .about-desc {
    font-size: 13px;
    margin-bottom: 20px;
  }
  .about-feature {
    font-size: 13px;
    gap: 8px;
  }
  .about-image img {
    border-radius: 14px;
  }
}

/* ===== Stats Section ===== */

.stats-section {
  padding: 40px 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.stat-card {
  text-align: center;
  padding: 36px 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f0f5ff 100%);
  border: 1px solid rgba(59, 130, 246, 0.12);
  box-shadow: 0 8px 30px rgba(30, 64, 175, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(59, 130, 246, 0.15),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(30, 64, 175, 0.18),
    0 0 0 1px rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: white;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.35);
  position: relative;
  z-index: 1;
}

.stat-number {
  font-size: 38px;
  font-weight: 800;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
  position: relative;
  z-index: 1;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .stats-section {
    padding: 30px 0;
  }
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .stat-card {
    padding: 24px 16px;
  }
  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    margin-bottom: 12px;
  }
  .stat-icon svg {
    width: 22px;
    height: 22px;
  }
  .stat-number {
    font-size: 28px;
  }
  .stat-label {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .stat-card {
    padding: 20px 10px;
    border-radius: 14px;
  }
  .stat-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .stat-icon svg {
    width: 20px;
    height: 20px;
  }
  .stat-number {
    font-size: 22px;
  }
  .stat-label {
    font-size: 10px;
  }
}

/* ===== Popular Dishes Section ===== */
.popular-dishes {
  padding: 70px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
}

.section-header p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 6px;
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 24px;
  }
  .section-header p {
    font-size: 13px;
  }
  .section-header {
    margin-bottom: 28px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 20px;
  }
  .section-header p {
    font-size: 12px;
  }
  .section-header {
    margin-bottom: 20px;
  }
  .resto-card-head {
    font-size: 22px;
  }
}

.home-dishes {
  padding: 40px 0;
}

.home-dishes-swiper {
  padding-bottom: 40px;
}

/* --- Dish Card --- */
.dish-card {
  position: relative;
  background: linear-gradient(165deg, #ffffff 0%, #f0f4ff 50%, #e8eeff 100%);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(99, 102, 241, 0.12);
  box-shadow: 0 8px 32px rgba(30, 64, 175, 0.08),
    0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Glow layer on hover */
.dish-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(59, 130, 246, 0.18),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
  z-index: 1;
}

/* Shimmer accent line */
.dish-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 5;
}

.dish-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.35);
  box-shadow: 0 24px 56px rgba(30, 64, 175, 0.18),
    0 8px 24px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(99, 102, 241, 0.15);
}

.dish-card:hover::before {
  opacity: 1;
}

.dish-card:hover::after {
  opacity: 1;
  animation: shimmerLine 2s linear infinite;
}

@keyframes shimmerLine {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* --- Dish Image --- */
.dish-image-wrap {
  overflow: hidden;
  position: relative;
  border-radius: 20px 20px 0 0;
}

.dish-image-wrap img {
  width: 100%;
  height: 210px;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease;
}

.dish-card:hover .dish-image-wrap img {
  transform: scale(1.1);
  filter: saturate(1.1) brightness(1.05);
}

/* Cinematic gradient overlay */
.dish-image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(15, 23, 42, 0) 30%,
    rgba(15, 23, 42, 0.15) 60%,
    rgba(15, 23, 42, 0.55) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Floating price badge */
.dish-price-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 5px 14px;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.45);
  z-index: 2;
  letter-spacing: 0.3px;
  backdrop-filter: blur(6px);
  transition: all 0.35s ease;
}

.dish-card:hover .dish-price-badge {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(30, 64, 175, 0.55);
}

/* --- Dish Info --- */
.dish-info {
  padding: 18px 18px 20px;
  position: relative;
  z-index: 2;
}

.dish-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
  letter-spacing: -0.2px;
  transition: color 0.3s ease;
  line-height: 1.3;
}

.dish-card:hover .dish-info h4 {
  color: #1e40af;
}

.dish-restaurant {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.dish-restaurant svg {
  flex-shrink: 0;
  color: #94a3b8;
}

/* --- Favorite Button --- */
.dish-fav-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: #cbd5e1;
  font-size: 17px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dish-fav-btn:hover {
  transform: scale(1.15) rotate(-5deg);
  background: white;
  box-shadow: 0 6px 24px rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.dish-fav-btn.active {
  color: #ef4444;
  background: white;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.35);
  animation: heartPop 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25) rotate(-8deg);
  }
  100% {
    transform: scale(1);
  }
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .dish-card {
    border-radius: 16px;
  }
  .dish-image-wrap {
    border-radius: 16px 16px 0 0;
  }
  .dish-image-wrap img {
    height: 180px;
  }
  .dish-info {
    padding: 14px 14px 16px;
  }
  .dish-info h4 {
    font-size: 15px;
  }
  .dish-price-badge {
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .dish-card {
    border-radius: 14px;
  }
  .dish-card:hover {
    transform: translateY(-6px) scale(1.01);
  }
  .dish-image-wrap {
    border-radius: 14px 14px 0 0;
  }
  .dish-image-wrap img {
    height: 170px;
  }
  .dish-info {
    padding: 12px 12px 14px;
  }
  .dish-info h4 {
    font-size: 14px;
  }
  .dish-fav-btn {
    width: 34px;
    height: 34px;
    font-size: 15px;
    border-radius: 10px;
  }
  .dish-price-badge {
    bottom: 10px;
    left: 10px;
    font-size: 11px;
    padding: 4px 10px;
  }
}

.search-section {
  margin-top: 32px;
  margin-bottom: 32px;
}

.search-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .search-title {
    font-size: 20px;
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .search-section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .search-title {
    font-size: 18px;
    margin-bottom: 12px;
  }
}

.offers-banner-section {
  padding: 40px 0;
}

.offers-swiper {
  margin-top: 30px;
}

.offer-banner {
  position: relative;
  height: 320px;
  border-radius: 22px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 48px;
  color: white;
}

.offer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(15, 23, 42, 0.4) 50%,
    rgba(15, 23, 42, 0.15) 100%
  );
}

.offer-banner-content {
  position: relative;
  z-index: 2;
  max-width: 440px;
}

.offer-tag {
  display: inline-block;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 14px;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
  animation: tagPulse 2s ease-in-out infinite;
}

@keyframes tagPulse {
  0%,
  100% {
    box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 4px 24px rgba(239, 68, 68, 0.6);
  }
}

.offer-banner-content h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: -0.3px;
}

.offer-banner-content p {
  font-size: 15px;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
}

.offer-btn {
  background: white;
  color: #1e40af;
  border: none;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}

.offer-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
}

@media (max-width: 768px) {
  .offers-banner-section {
    padding: 30px 0;
  }
  .offer-banner {
    height: 260px;
    padding: 32px;
    border-radius: 18px;
  }
  .offer-banner-content h2 {
    font-size: 24px;
  }
  .offer-banner-content p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .offer-banner {
    height: 240px;
    padding: 24px;
    border-radius: 14px;
  }
  .offer-banner-content h2 {
    font-size: 20px;
  }
  .offer-btn {
    padding: 10px 20px;
    font-size: 13px;
    border-radius: 10px;
  }
}

/* ===== Customer Reviews ===== */

.reviews-section {
  padding: 40px 0;
}

.reviews-swiper {
  padding-bottom: 10px;
}

/* --- Review Card --- */
.review-card {
  position: relative;
  background: linear-gradient(165deg, #ffffff 0%, #f0f4ff 50%, #e8eeff 100%);
  border-radius: 22px;
  padding: 28px 26px 24px;
  border: 1px solid rgba(99, 102, 241, 0.1);
  box-shadow: 0 8px 32px rgba(30, 64, 175, 0.07),
    0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
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
  box-shadow: 0 24px 56px rgba(30, 64, 175, 0.14),
    0 8px 20px rgba(59, 130, 246, 0.08), 0 0 0 1px rgba(99, 102, 241, 0.12);
}

.review-card:hover::before {
  opacity: 1;
  animation: shimmerLine 2s linear infinite;
}

.review-card:hover::after {
  color: rgba(59, 130, 246, 0.1);
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

/* --- Review Text --- */
.review-text {
  font-size: 14px;
  color: #475569;
  line-height: 1.75;
  font-style: italic;
  flex: 1;
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

.review-restaurant-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  background: rgba(99, 102, 241, 0.06);
  padding: 4px 10px;
  border-radius: 8px;
  width: fit-content;
  transition: all 0.3s ease;
}

.review-restaurant-tag svg {
  flex-shrink: 0;
  color: #94a3b8;
}

.review-card:hover .review-restaurant-tag {
  background: rgba(59, 130, 246, 0.1);
  color: #475569;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .reviews-section {
    padding: 30px 0;
  }
  .review-card {
    padding: 22px 20px 20px;
    border-radius: 18px;
  }
  .review-avatar {
    width: 40px;
    height: 40px;
    font-size: 16px;
    border-radius: 12px;
  }
  .review-rating-badge {
    padding: 4px 10px;
    font-size: 12px;
  }
  .section-header h2 {
    font-size: 24px;
  }
  .section-header p {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .review-card {
    padding: 18px 16px 16px;
    border-radius: 16px;
    gap: 12px;
  }
  .review-card::after {
    font-size: 56px;
    top: 48px;
    right: 14px;
  }
  .review-avatar {
    width: 36px;
    height: 36px;
    font-size: 14px;
    border-radius: 10px;
  }
  .review-text {
    font-size: 13px;
  }
  .section-header h2 {
    font-size: 22px;
  }
}

/* ===== CTA Section ===== */

.cta-section {
  padding: 40px 0 60px;
}

.cta-card {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%);
  min-height: 340px;
}

/* Decoration side */
.cta-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cta-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.cta-circle-1 {
  width: 400px;
  height: 400px;
  top: -120px;
  right: -80px;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.15),
    transparent 70%
  );
}

.cta-circle-2 {
  width: 250px;
  height: 250px;
  bottom: -60px;
  left: 10%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent 70%);
}

.cta-circle-3 {
  width: 180px;
  height: 180px;
  top: 20%;
  right: 30%;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.12),
    transparent 70%
  );
}

.cta-emoji {
  position: absolute;
  font-size: 36px;
  opacity: 0.15;
  animation: ctaFloat 8s ease-in-out infinite;
}

.cta-emoji-1 {
  top: 15%;
  right: 12%;
  animation-delay: 0s;
}
.cta-emoji-2 {
  bottom: 20%;
  right: 25%;
  animation-delay: 2s;
}
.cta-emoji-3 {
  top: 25%;
  left: 8%;
  animation-delay: 4s;
  font-size: 28px;
}
.cta-emoji-4 {
  bottom: 15%;
  left: 20%;
  animation-delay: 6s;
  font-size: 30px;
}

@keyframes ctaFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-12px) rotate(5deg);
  }
  75% {
    transform: translateY(8px) rotate(-3deg);
  }
}

/* Content side */
.cta-content {
  position: relative;
  z-index: 2;
  padding: 56px 60px;
  max-width: 600px;
  color: white;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.cta-content h2 {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.cta-content p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 28px;
}

.cta-buttons {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.cta-primary {
  background: white;
  color: #1e40af;
  border: none;
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  padding: 14px 28px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cta-section {
    padding: 30px 0 50px;
  }
  .cta-card {
    border-radius: 22px;
    min-height: 280px;
  }
  .cta-content {
    padding: 40px 36px;
  }
  .cta-content h2 {
    font-size: 26px;
  }
  .cta-content p {
    font-size: 14px;
  }
  .cta-emoji {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .cta-section {
    padding: 24px 0 40px;
  }
  .cta-card {
    border-radius: 18px;
    min-height: auto;
  }
  .cta-content {
    padding: 32px 24px;
  }
  .cta-content h2 {
    font-size: 22px;
    br {
      display: none;
    }
  }
  .cta-content p {
    font-size: 13px;
    margin-bottom: 22px;
  }
  .cta-badge {
    font-size: 11px;
  }
  .cta-primary,
  .cta-secondary {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
  }
  .cta-emoji-1,
  .cta-emoji-2 {
    display: none;
  }
}
</style>
