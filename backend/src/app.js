const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "API funcionando" });
});

app.use(orderRoutes);

module.exports = app;