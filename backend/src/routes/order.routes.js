const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrders,
} = require("../controllers/order.controller");

router.post("/orders", createOrder);
router.get("/orders", listOrders);

module.exports = router; 