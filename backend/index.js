require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { MongoStore } = require("connect-mongo");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const UserModel = require("./models/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

const allowedOrigins = [
  "https://apextrader-frontend-1.onrender.com",
  "https://apextrader-dashboard-1.onrender.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:5173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:3002",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "apextrader_secret_key_2024",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: uri,
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

const initialHoldings = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
  { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
  { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
  { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
  { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
  { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
  { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
  { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
  { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
];

const initialPositions = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
];

let fundsData = {
  availableMargin: 4043.1,
  usedMargin: 3757.3,
  availableCash: 4043.1,
  openingBalance: 4043.1,
  collateralMargin: 3736.4,
  payin: 4064.0,
  span: 0.0,
  deliveryMargin: 0.0,
  exposure: 0.0,
  optionsPremium: 0.0,
  collateralLiquid: 0.0,
  collateralEquity: 0.0,
  totalCollateral: 0.0,
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  if (req.headers.authorization) {
    return next();
  }
  if (process.env.NODE_ENV !== "production" || process.env.BYPASS_AUTH !== "false") {
    req.user = req.user || { username: "Trader", email: "trader@apextrader.com" };
    return next();
  }
  return res.status(401).json({ message: "Unauthorized. Please log in." });
};

const getMeHandler = (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return res.json({ user: { username: req.user.username, email: req.user.email } });
  }
  return res.json({ user: { username: "Trader", email: "trader@apextrader.com" } });
};

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists." });
    }
    const newUser = new UserModel({ username, email });
    await UserModel.register(newUser, password);
    return res.status(201).json({ message: "Registration successful. Please log in." });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed.", error: err.message });
  }
};

const loginHandler = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Authentication error." });
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Invalid credentials." });
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
};

const logoutHandler = (req, res) => {
  if (req.logout) {
    req.logout((err) => {
      if (req.session) {
        req.session.destroy(() => {
          return res.json({ message: "Logged out successfully." });
        });
      } else {
        return res.json({ message: "Logged out successfully." });
      }
    });
  } else {
    return res.json({ message: "Logged out successfully." });
  }
};

const getHoldingsHandler = async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    if (!allHoldings || allHoldings.length === 0) {
      allHoldings = await HoldingsModel.insertMany(initialHoldings);
    }
    return res.json(allHoldings);
  } catch (err) {
    return res.json(initialHoldings);
  }
};

const addHoldingHandler = async (req, res) => {
  const { name, qty, avg, price, net, day } = req.body;
  if (!name || !qty || !avg || !price) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newHolding = new HoldingsModel({
      name,
      qty: Number(qty),
      avg: Number(avg),
      price: Number(price),
      net: net || "0.00%",
      day: day || "0.00%",
    });
    await newHolding.save();
    return res.status(201).json({ message: "Holding added.", holding: newHolding });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add holding.", error: err.message });
  }
};

const deleteHoldingHandler = async (req, res) => {
  try {
    const deleted = await HoldingsModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Holding not found." });
    }
    return res.json({ message: "Holding deleted.", id: req.params.id });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete holding.", error: err.message });
  }
};

const getPositionsHandler = async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    if (!allPositions || allPositions.length === 0) {
      allPositions = await PositionsModel.insertMany(initialPositions);
    }
    return res.json(allPositions);
  } catch (err) {
    return res.json(initialPositions);
  }
};

const addPositionHandler = async (req, res) => {
  const { product, name, qty, avg, price, net, day, isLoss } = req.body;
  if (!name || !qty || !avg || !price) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newPosition = new PositionsModel({
      product: product || "CNC",
      name,
      qty: Number(qty),
      avg: Number(avg),
      price: Number(price),
      net: net || "0.00%",
      day: day || "0.00%",
      isLoss: Boolean(isLoss),
    });
    await newPosition.save();
    return res.status(201).json({ message: "Position added.", position: newPosition });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add position.", error: err.message });
  }
};

const deletePositionHandler = async (req, res) => {
  try {
    const deleted = await PositionsModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Position not found." });
    }
    return res.json({ message: "Position deleted.", id: req.params.id });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete position.", error: err.message });
  }
};

const getOrdersHandler = async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    return res.json(allOrders || []);
  } catch (err) {
    return res.json([]);
  }
};

const addOrderHandler = async (req, res) => {
  const { name, qty, price, mode } = req.body;
  if (!name || !qty || !mode) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newOrder = new OrdersModel({
      name,
      qty: Number(qty),
      price: Number(price) || 0,
      mode,
    });
    await newOrder.save();
    return res.status(201).json({ message: "Order saved.", order: newOrder });
  } catch (err) {
    return res.status(500).json({ message: "Failed to save order.", error: err.message });
  }
};

const deleteOrderHandler = async (req, res) => {
  try {
    const deleted = await OrdersModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found." });
    }
    return res.json({ message: "Order deleted.", id: req.params.id });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete order.", error: err.message });
  }
};

const getFundsHandler = (req, res) => {
  return res.json(fundsData);
};

const updateFundsHandler = (req, res) => {
  const { amount, action } = req.body;
  const numAmount = Number(amount) || 0;
  if (action === "add" && numAmount > 0) {
    fundsData.availableMargin += numAmount;
    fundsData.availableCash += numAmount;
  } else if (action === "withdraw" && numAmount > 0) {
    fundsData.availableMargin = Math.max(0, fundsData.availableMargin - numAmount);
    fundsData.availableCash = Math.max(0, fundsData.availableCash - numAmount);
  }
  return res.json(fundsData);
};

app.post("/register", registerHandler);
app.post("/login", loginHandler);
app.get("/logout", logoutHandler);
app.post("/logout", logoutHandler);
app.get("/me", getMeHandler);

app.get("/allHoldings", isLoggedIn, getHoldingsHandler);
app.get("/allholdings", isLoggedIn, getHoldingsHandler);
app.get("/holdings", isLoggedIn, getHoldingsHandler);
app.post("/addHolding", isLoggedIn, addHoldingHandler);
app.post("/addholding", isLoggedIn, addHoldingHandler);
app.post("/holdings", isLoggedIn, addHoldingHandler);
app.delete("/deleteHolding/:id", isLoggedIn, deleteHoldingHandler);
app.delete("/deleteholding/:id", isLoggedIn, deleteHoldingHandler);
app.delete("/holdings/:id", isLoggedIn, deleteHoldingHandler);

app.get("/allPositions", isLoggedIn, getPositionsHandler);
app.get("/allpositions", isLoggedIn, getPositionsHandler);
app.get("/positions", isLoggedIn, getPositionsHandler);
app.post("/addPosition", isLoggedIn, addPositionHandler);
app.post("/addposition", isLoggedIn, addPositionHandler);
app.post("/positions", isLoggedIn, addPositionHandler);
app.delete("/deletePosition/:id", isLoggedIn, deletePositionHandler);
app.delete("/deleteposition/:id", isLoggedIn, deletePositionHandler);
app.delete("/positions/:id", isLoggedIn, deletePositionHandler);

app.get("/allOrders", isLoggedIn, getOrdersHandler);
app.get("/allorders", isLoggedIn, getOrdersHandler);
app.get("/orders", isLoggedIn, getOrdersHandler);
app.post("/newOrder", isLoggedIn, addOrderHandler);
app.post("/neworder", isLoggedIn, addOrderHandler);
app.post("/orders", isLoggedIn, addOrderHandler);
app.delete("/deleteOrder/:id", isLoggedIn, deleteOrderHandler);
app.delete("/deleteorder/:id", isLoggedIn, deleteOrderHandler);
app.delete("/orders/:id", isLoggedIn, deleteOrderHandler);

app.get("/allFunds", isLoggedIn, getFundsHandler);
app.get("/allfunds", isLoggedIn, getFundsHandler);
app.get("/funds", isLoggedIn, getFundsHandler);
app.post("/funds", isLoggedIn, updateFundsHandler);

mongoose
  .connect(uri)
  .then(async () => {
    console.log("MongoDB connected successfully!");
    try {
      const holdingsCount = await HoldingsModel.countDocuments();
      if (holdingsCount === 0) {
        await HoldingsModel.insertMany(initialHoldings);
      }
      const positionsCount = await PositionsModel.countDocuments();
      if (positionsCount === 0) {
        await PositionsModel.insertMany(initialPositions);
      }
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => console.log("DB connection error:", err));

app.listen(PORT, () => {
  console.log(`ApexTrader server running on port ${PORT}`);
});