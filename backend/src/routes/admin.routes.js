const express = require("express");
const router = express.Router();
const { adminLogin } = require("../controllers/admin.controller");

router.post("/admin/login", adminLogin);

module.exports = router;