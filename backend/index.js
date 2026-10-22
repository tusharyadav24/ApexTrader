require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { MongoStore } = require('connect-mongo');

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const UserModel = require("./models/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: ["https://apextrader-frontend-1.onrender.com", "https://apextrader-dashboard-1.onrender.com"],
    credentials: true,
  })
);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  session({
    secret: process.env.SESSION_SECRET || "apextrader_secret_key_2024",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri
    }),
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "apextrader_secret_key_2024",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized. Please log in." });
};

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists." });
    }
    const newUser = new UserModel({ username, email });
    await UserModel.register(newUser, password);
    res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (err) {
    res.status(500).json({ message: "Registration failed.", error: err.message });
  }
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error." });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Invalid credentials." });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Login failed." });
      }
      return res.json({
        message: "Login successful.",
        user: { username: user.username, email: user.email },
      });
    });
  })(req, res, next);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully." });
    });
  });
});

app.get("/me", isLoggedIn, (req, res) => {
  res.json({ user: { username: req.user.username, email: req.user.email } });
});

app.get("/allHoldings", isLoggedIn, async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch holdings." });
  }
});

app.post("/addHolding", isLoggedIn, async (req, res) => {
  const { name, qty, avg, price, net, day } = req.body;
  if (!name || !qty || !avg || !price) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newHolding = new HoldingsModel({ name, qty, avg, price, net, day });
    await newHolding.save();
    res.status(201).json({ message: "Holding added.", holding: newHolding });
  } catch (err) {
    res.status(500).json({ message: "Failed to add holding." });
  }
});

app.delete("/deleteHolding/:id", isLoggedIn, async (req, res) => {
  try {
    await HoldingsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Holding deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete holding." });
  }
});

app.get("/allPositions", isLoggedIn, async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch positions." });
  }
});

app.post("/addPosition", isLoggedIn, async (req, res) => {
  const { product, name, qty, avg, price, net, day, isLoss } = req.body;
  if (!name || !qty || !avg || !price) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newPosition = new PositionsModel({
      product,
      name,
      qty,
      avg,
      price,
      net,
      day,
      isLoss,
    });
    await newPosition.save();
    res.status(201).json({ message: "Position added.", position: newPosition });
  } catch (err) {
    res.status(500).json({ message: "Failed to add position." });
  }
});

app.delete("/deletePosition/:id", isLoggedIn, async (req, res) => {
  try {
    await PositionsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Position deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete position." });
  }
});

app.get("/allOrders", isLoggedIn, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders." });
  }
});

app.post("/newOrder", isLoggedIn, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  if (!name || !qty || !mode) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();
    res.status(201).json({ message: "Order saved.", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to save order." });
  }
});

app.delete("/deleteOrder/:id", isLoggedIn, async (req, res) => {
  try {
    await OrdersModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order." });
  }
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log("DB connection error:", err));

app.listen(PORT, () => {
  console.log(`ApexTrader server running on port ${PORT}`);
});
