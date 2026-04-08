const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.post("/orders", createOrder);
router.get("/orders", listOrders);
router.patch("/orders/:id/status", updateOrderStatus);

module.exports = router;