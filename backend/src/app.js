const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando" });
});

app.use(orderRoutes);
app.use(adminRoutes);

module.exports = app;