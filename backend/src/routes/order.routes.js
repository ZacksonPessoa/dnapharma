const express = require("express");
const router = express.Router();
const {
  createOrder,
  listOrders,
  updateOrderStatus,
  getOrderById,
} = require("../controllers/order.controller");

router.post("/orders", createOrder);
router.get("/orders", listOrders);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id/status", updateOrderStatus);

module.exports = router;