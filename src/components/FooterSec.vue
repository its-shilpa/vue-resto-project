<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Brand -->
      <div class="footer-brand" data-aos="fade-up">
        <div class="footer-logo">
          <span class="footer-logo-icon">🍽️</span>
          <h3>RestroHub</h3>
        </div>
        <p>Manage restaurants, users, and orders with ease. Built with modern tools for a seamless experience.</p>
      </div>

      <!-- Links -->
      <div class="footer-links" data-aos="fade-up" data-aos-delay="100">
        <h4>Quick Links</h4>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
          <li><router-link to="/all-restaurants">All Resturants</router-link></li>
          <li><router-link to="/favorites">My Favourites</router-link></li>
          <li><router-link v-if="isAdmin" to="/users-list">Users List</router-link></li>
          <li><router-link v-if="isAdmin" to="/admin-dashboard">Dashboard</router-link></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer-contact" data-aos="fade-up" data-aos-delay="200">
        <h4>Contact</h4>
        <p>📧 shilpamukherjee625@gmail.com</p>
        <p>📞 +91 62940 94588</p>
        <p>📍 Kolkata, India</p>
      </div>

      <!-- Social -->
      <div class="footer-social" data-aos="fade-up" data-aos-delay="300">
        <h4>Follow Us</h4>
        <div class="social-icons">
          <a href="https://github.com/its-shilpa" target="_blank" aria-label="GitHub" class="social-link social-github">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/shilpa-mukherjee/" target="_blank" aria-label="LinkedIn" class="social-link social-linkedin">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://x.com/its_meShilpa" target="_blank" aria-label="Twitter" class="social-link social-twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.instagram.com/snowy_shilpa/" target="_blank" aria-label="Instagram" class="social-link social-instagram">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
      </div>                        
    </div>

    <div class="footer-divider"></div>

    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} RestroHub. All rights reserved.
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user");
    },
    isAdmin() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role === "admin";
    }
  },
};
</script>

<style scoped>
.app-footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
  color: rgba(255, 255, 255, 0.85);
  padding: 48px 24px 24px;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 27px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.footer-logo-icon {
  font-size: 24px;
}

.footer-brand h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.footer-brand p {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 280px;
}

.footer-links h4,
.footer-contact h4,
.footer-social h4 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin: 8px 0;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 14px;
  transition: var(--transition);
}

.footer-links a:hover {
  color: var(--accent-light);
}

.footer-contact p {
  font-size: 13px;
  margin: 8px 0;
  color: rgba(255, 255, 255, 0.6);
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.social-link:hover {
  transform: translateY(-4px) scale(1.08);
  border-color: transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Brand colors on hover */
.social-github:hover {
  background: #333;
  color: #ffffff;
}

.social-linkedin:hover {
  background: #0077b5;
  color: #ffffff;
}

.social-twitter:hover {
  background: #000000;
  color: #ffffff;
}

.social-instagram:hover {
  background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: #ffffff;
}

.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 32px 0 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.footer-bottom {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

/* ===== Responsive ===== */
@media (max-width: 992px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 28px;
  }

  .footer-brand p {
    margin: 0 auto;
    max-width: 90%;
  }

  .footer-logo {
    justify-content: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>