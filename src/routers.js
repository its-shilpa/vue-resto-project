import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/Login.vue";
import AddResturent from "./components/AddResturent.vue";
import UpdateResturent from "./components/UpdateResturent.vue";
import AdminDashboard from "./components/AdminDashboard.vue";
import ProfilePage from "./components/ProfilePage.vue";
import LoggedInUsers from "./components/LoggedInUsers.vue";
import RestaurantDetails from "./components/RestaurantDetails.vue";
import FavoritePage from "./components/FavoritePage.vue";
import AllRestaurants from "./components/AllRestaurants.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    meta: { requiresAuth: true }
  },

  // Admin routes
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: "/add-resturent",
    name: "AddResturent",
    component: AddResturent,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: "/update-resturent/:id",
    name: "UpdateResturent",
    component: UpdateResturent,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: "/users-list",
    name: "LoggedInUsers",
    component: LoggedInUsers,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: "/restaurant/:id",
    name: "RestaurantDetails",
    component: RestaurantDetails,
  },
  {
    path: "/all-restaurants",
    name: "AllRestaurants",
    component: AllRestaurants,
    meta: { requiresAuth: true }
  },
  {
    path:"/favorites",
    name:"Favorites",
    component: FavoritePage,
  },

  // Optional: fallback
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Global Auth + Role Guard (Single Source of Truth)
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user")); // must match authService.js

  // If route requires auth and user is not logged in → go to login
  if (to.meta.requiresAuth && !user) {
    return next({ name: "Login" });
  }

  // If route is admin-only and user is not admin → go home
  if (to.meta.adminOnly && user?.role !== "admin") {
    return next({ name: "Home" });
  }

  // Prevent logged-in users from accessing Login page
  if (to.name === "Login" && user) {
    return next(user.role === "admin" ? { name: "AdminDashboard" } : { name: "Home" });
  }

  next();
});

export default router;