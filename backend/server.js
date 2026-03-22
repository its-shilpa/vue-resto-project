const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// 📂 DB PATH
const dbPath = path.join(__dirname, "db.json");

// 📖 Read DB
const getDB = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

// 💾 Save DB
const saveDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


// ================= USERS API =================

// 🔍 GET USERS (with login filter support)
app.get("/users", (req, res) => {
  const db = getDB();
  let users = db.users || [];

  const { email, password } = req.query;

  // login filter
  if (email && password) {
    users = users.filter(
      (u) => u.email === email && u.password === password
    );
  } else if (email) {
    users = users.filter((u) => u.email === email);
  }

  res.json(users);
});

// 🔍 GET USER BY ID
app.get("/users/:id", (req, res) => {
  const db = getDB();
  const id = req.params.id; // Usually a string
  const user = db.users.find((u) => String(u.id) === String(id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// ➕ CREATE USER (signup)
app.post("/users", (req, res) => {
  const db = getDB();

  const user = {
    id: Date.now(),
    isLoggedIn: false,
    ...req.body,
  };

  db.users.push(user);
  saveDB(db);

  res.json(user);
});

// ✏️ UPDATE USER (login/logout)
app.patch("/users/:id", (req, res) => {
  const db = getDB();
  const id = req.params.id;

  db.users = db.users.map((u) =>
    String(u.id) === String(id) ? { ...u, ...req.body } : u
  );

  saveDB(db);

  res.json({ success: true });
});


// ================= ORDERS API =================

app.get("/orders", (req, res) => {
  const db = getDB();
  res.json(db.orders || []);
});

app.post("/orders", (req, res) => {
  const db = getDB();

  const order = {
    id: Date.now(),
    reviewed: false,
    createdAt: new Date(),
    ...req.body,
  };

  db.orders.push(order);
  saveDB(db);

  res.json(order);
});

app.patch("/orders/:id", (req, res) => {
  const db = getDB();
  const id = req.params.id;

  db.orders = db.orders.map((o) =>
    String(o.id) === String(id) ? { ...o, ...req.body } : o
  );

  saveDB(db);

  res.json({ success: true });
});


// ================= REVIEWS API =================

app.get("/reviews", (req, res) => {
  const db = getDB();
  let reviews = db.reviews || [];

  const { orderId, restaurantId } = req.query;

  if (orderId) {
    reviews = reviews.filter((r) => r.orderId == orderId);
  }

  if (restaurantId) {
    reviews = reviews.filter((r) => r.restaurantId == restaurantId);
  }

  res.json(reviews);
});

app.post("/reviews", (req, res) => {
  const db = getDB();

  const review = {
    id: Date.now(),
    createdAt: new Date(),
    ...req.body,
  };

  db.reviews.push(review);
  saveDB(db);

  res.json(review);
});


// ================= RESTAURANTS API =================
app.get("/resturent", (req, res) => {
  const db = getDB();
  let restaurants = db.resturent || [];

  const { name } = req.query;
  if (name) {
    restaurants = restaurants.filter((r) => r.name === name);
  }

  res.json(restaurants);
});

app.get("/resturent/:id", (req, res) => {
  const db = getDB();
  const id = req.params.id; // Could be string or number based on how it's stored
  const restaurant = (db.resturent || []).find((r) => String(r.id) === String(id));

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

app.patch("/resturent/:id", (req, res) => {
  const db = getDB();
  const id = req.params.id;
  
  if (!db.resturent) db.resturent = [];
  
  db.resturent = db.resturent.map((r) =>
    String(r.id) === String(id) ? { ...r, ...req.body } : r
  );

  saveDB(db);
  res.json({ success: true });
});

// ================= SERVER =================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});