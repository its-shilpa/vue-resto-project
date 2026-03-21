<template>

<div class="favorites-page">

<!-- Banner -->
<section class="page-banner">
  <div class="banner-bg"></div>
  <div class="banner-content" data-aos="fade-down" data-aos-duration="1000">
    <h1 class="banner-title">Your <span class="banner-highlight">Favorites</span></h1>
    <p class="banner-subtitle">All your loved restaurants and dishes in one place</p>
  </div>
</section>

<div class="favorites-wrapper page-container">
<!-- Tabs -->
<div class="fav-tabs" data-aos="fade-up" data-aos-delay="100">

<button
:class="['tab-btn',{active:activeTab==='restaurants'}]"
@click="activeTab='restaurants'"
>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
Restaurants
</button>

<button
:class="['tab-btn',{active:activeTab==='dishes'}]"
@click="activeTab='dishes'"
>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
Dishes
</button>

</div>


<!-- Restaurants -->

<div v-if="activeTab==='restaurants'">

<div v-if="favoriteRestaurants.length" class="favorite-grid" data-aos="fade-up">

<div
v-for="(restaurant, index) in favoriteRestaurants"
:key="restaurant.id"
class="favorite-item"
@click="goToDetails(restaurant.id)"
data-aos="fade-up"
:data-aos-delay="index * 100"
>
  <div class="fav-card-bg" :style="{ backgroundImage: `url(${restaurant.image || 'https://images.pexels.com/photos/11975899/pexels-photo-11975899.jpeg'})` }"></div>
  <div class="fav-card-overlay"></div>
  <button class="fav-heart-btn" @click.stop="removeFavorite(restaurant.id)">
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  </button>
  <div class="fav-card-inner">
    <h4>{{ restaurant.name }}</h4>
    <span class="fav-card-cuisine" v-if="restaurant.cuisine">{{ restaurant.cuisine }}</span>
    <div class="fav-card-action">
      <span class="fav-view-label">View Restaurant</span>
      <span class="fav-card-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg>
      </span>
    </div>
  </div>
</div>

</div>


<div v-else class="empty-state">
<div class="empty-icon-wrap">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
</div>
<h3>No Favorite Restaurants</h3>
<p>Start adding restaurants you love</p>

</div>

</div>



<!-- Dishes -->

<div v-if="activeTab==='dishes'">

<div v-if="favoriteDishes.length" class="favorites-grid" data-aos="fade-up">

<div
v-for="(dish, index) in favoriteDishes"
:key="index"
class="dish-card"
data-aos="fade-up"
:data-aos-delay="index * 100"
>
  <div class="dish-card-bg" :style="{ backgroundImage: `url(${dish.image})` }"></div>
  <div class="dish-card-overlay"></div>
  <span class="dish-price-badge">₹ {{ dish.price }}</span>
  <button class="fav-heart-btn" @click.stop="removeDish(index)">
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
  </button>
  <div class="dish-card-inner">
    <h4>{{ dish.name }}</h4>
    <span class="dish-from-tag" v-if="dish.restaurant">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      {{ dish.restaurant }}
    </span>
  </div>
</div>

</div>

<div v-else class="empty-state">
<div class="empty-icon-wrap">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
</div>
<h3>No Favorite Dishes</h3>
<p>Add dishes you love from our restaurants</p>

</div>

</div>

</div>

</div>

</template>

<script>
// import axios from "axios";
import API from "@/services/api";

export default {
  name: "FavoritePage",

  data() {
    return {
      activeTab:"restaurants",
      favoriteDishes: [],
      allRestaurants: [],
      userData: null,
    };
  },

  async mounted() {
    this.userData = JSON.parse(localStorage.getItem("user"));

    await this.loadRestaurants();

    if (this.userData?.favoriteDishes) {
      this.favoriteDishes = this.userData.favoriteDishes;
    }
  },

  computed: {
    favoriteRestaurants() {
      if (!this.userData?.favorites?.length) return [];

      return this.allRestaurants.filter((r) =>
        this.userData.favorites.includes(r.id),
      );
    },
  },

  methods: {
    async loadRestaurants() {
      const res = await API.get("/resturent");

      this.allRestaurants = res.data;
    },

    async removeFavorite(id) {
      const updatedFavorites = this.userData.favorites.filter((f) => f !== id);

      await API.patch(`/users/${this.userData.id}`, {
        favorites: updatedFavorites,
      });

      this.userData.favorites = updatedFavorites;

      localStorage.setItem("user", JSON.stringify(this.userData));
    },

    goToDetails(id) {
      this.$router.push(`/restaurant/${id}`);
    },

    removeDish(index) {
      this.favoriteDishes.splice(index, 1);

      this.userData.favoriteDishes = this.favoriteDishes;

      localStorage.setItem("user", JSON.stringify(this.userData));
    },
  },
};
</script>


<style scoped>
/* ===== Banner ===== */
.page-banner {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
  padding: 44px 24px;
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
}

/* ===== Page Layout ===== */

.favorites-wrapper {
  padding-top: 36px;
  padding-bottom: 60px;
}

/* ===== Tabs ===== */

.fav-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 36px;
  background: rgba(241, 245, 249, 0.8);
  backdrop-filter: blur(12px);
  padding: 6px;
  border-radius: 16px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(99, 102, 241, 0.08);
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
}

.tab-btn {
  padding: 12px 28px;
  border: none;
  background: transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn svg {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.tab-btn:hover {
  color: #475569;
  background: rgba(255, 255, 255, 0.5);
}

.tab-btn.active {
  background: white;
  color: #1e40af;
  box-shadow: 0 4px 16px rgba(30, 64, 175, 0.12), 0 1px 3px rgba(0,0,0,0.06);
}

.tab-btn.active svg {
  opacity: 1;
  color: #3b82f6;
}

/* ===== Restaurant Grid ===== */

.favorite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
  justify-content: center;
  gap: 20px;
}

/* ===== Restaurant Card (Image Overlay) ===== */

.favorite-item {
  position: relative;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fav-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease, filter 0.6s ease;
}

.favorite-item:hover .fav-card-bg {
  transform: scale(1.1);
  filter: brightness(0.85) saturate(1.2);
}

.fav-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.7) 75%, rgba(0,0,0,0.92) 100%);
  transition: background 0.4s ease;
}

.favorite-item:hover {
  transform: translateY(-6px);
  border-color: rgba(239, 68, 68, 0.35);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25);
}

.fav-heart-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 3;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(239, 68, 68, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
}

.fav-heart-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
}

.fav-card-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 22px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform: translateY(6px);
  transition: transform 0.4s ease;
}

.favorite-item:hover .fav-card-inner {
  transform: translateY(0);
}

.fav-card-inner h4 {
  font-size: 21px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.fav-card-cuisine {
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
  width: fit-content;
}

.fav-card-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.fav-view-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.fav-card-arrow {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-8px);
}

.favorite-item:hover .fav-card-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ===== Dishes ===== */

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
  justify-content: center;
  gap: 20px;
}

.dish-card {
  position: relative;
  height: 320px;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dish-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease, filter 0.6s ease;
}

.dish-card:hover .dish-card-bg {
  transform: scale(1.1);
  filter: brightness(0.85) saturate(1.2);
}

.dish-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.75) 80%, rgba(0,0,0,0.93) 100%);
}

.dish-card:hover {
  transform: translateY(-6px);
  border-color: rgba(5, 150, 105, 0.4);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25);
}

.dish-price-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 3;
  padding: 6px 16px;
  background: rgba(5, 150, 105, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 800;
  color: white;
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
}

.dish-card-inner {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 22px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transform: translateY(6px);
  transition: transform 0.4s ease;
}

.dish-card:hover .dish-card-inner {
  transform: translateY(0);
}

.dish-card-inner h4 {
  font-size: 20px;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.dish-from-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  width: fit-content;
}

.dish-from-tag svg {
  color: rgba(255, 255, 255, 0.5);
}

/* ===== Empty ===== */

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon-wrap {
  width: 90px;
  height: 90px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(99, 102, 241, 0.12));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #93c5fd;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.empty-state h3 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state p {
  color: #64748b;
  font-size: 14px;
}

/* ===== Responsive ===== */

@media (max-width: 768px) {
  .favorites-wrapper {
    padding-top: 28px;
    padding-bottom: 50px;
  }
  .page-banner {
    padding: 32px 20px;
  }
  .banner-title {
    font-size: 26px;
  }
  .banner-subtitle {
    font-size: 14px;
  }
  .fav-tabs {
    margin-bottom: 28px;
  }
  .tab-btn {
    padding: 10px 20px;
    font-size: 13px;
  }
  .favorite-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
    justify-content: center;
    gap: 20px;
  }
  .favorites-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
    justify-content: center;
    gap: 20px;
  }
  .favorite-item img {
    height: 170px;
  }
  .dish-image-wrap img {
    height: 170px;
  }
}

@media (max-width: 480px) {
  .favorites-wrapper {
    padding-top: 20px;
    padding-bottom: 40px;
  }
  .page-banner {
    padding: 24px 16px;
  }
  .banner-title {
    font-size: 22px;
  }
  .banner-subtitle {
    font-size: 13px;
  }
  .fav-tabs {
    width: 100%;
    justify-content: center;
  }
  .tab-btn {
    padding: 10px 16px;
    font-size: 13px;
    flex: 1;
    justify-content: center;
  }
  .favorite-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .favorite-item img {
    height: 180px;
  }
  .dish-image-wrap img {
    height: 180px;
  }
  .favorite-info {
    padding: 16px;
  }
  .dish-info {
    padding: 16px;
  }
  .empty-icon-wrap {
    width: 74px;
    height: 74px;
    border-radius: 18px;
  }
  .empty-icon-wrap svg {
    width: 32px;
    height: 32px;
  }
  .empty-state h3 {
    font-size: 18px;
  }
}
</style>

