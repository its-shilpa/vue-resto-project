# 🍽️ Restaurant Management System (Vue.js)

A full-featured restaurant management web application built using Vue.js, supporting both **Admin** and **User** roles with real-world functionalities like ordering, cart management, reviews, and profile handling.

🔗 **Live Demo:** https://resto-project-1k2n.onrender.com/

---

## 🚀 Features

### 👨‍💼 Admin Panel
- Add, edit, and delete restaurants
- Manage dishes (CRUD operations)
- View currently logged-in users

### 👤 User Panel
- User authentication (Signup/Login with validation)
- Add restaurants & dishes to favourites
- Manage user profile (view & update)
- Add items to cart
- Checkout & place orders
- Apply discount coupons
- Post reviews after ordering

---

## 🎁 Demo Credentials

**Admin Login**
- Email: `shilpa@test.com`
- Password: `Shilpa@123`

**Coupon Code**
- `SAVE50`

---

## 🛠️ Tech Stack

- **Frontend:** Vue.js  
- **State & Storage:** LocalStorage  
- **API Handling:** Axios  
- **Backend (Mock):** JSON Server (`db.json`)  
- **Deployment:** Render  

---

## ⚙️ Project Setup

### Install dependencies
```bash
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
---

⚠️ Important Note (Limitations)
- This project uses Render free hosting and a mock backend (JSON Server).
- Data is stored in localStorage, so:
- Sessions are temporary
- Data may reset due to server inactivity
- No real database is connected yet

---

💡 Future Improvements
- Integrate real backend (Node.js / Firebase / Supabase)
- Add JWT authentication & secure sessions
- Role-based access control (Admin/User)
- Persistent database for orders, users, and reviews
- Payment gateway integration

---

🎯 Learning Outcomes

This project helped me gain hands-on experience in:

- Building scalable Vue.js applications
- Managing complex UI flows (cart, checkout, auth)
- API integration using Axios
- State management using localStorage
- Form validation and user feedback (toasts)

---

🙌 Feedback

- I’m continuously improving this project.
- Feel free to share feedback or suggestions!

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
