const express = require("express");

const adminController = require("../controllers/admin");
const verifyToken = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");


const router = express.Router();

router.get("/add-product", verifyToken, checkAdmin, adminController.getAddProduct)
router.post("/add-product", verifyToken, checkAdmin, adminController.postAddProduct);

module.exports = router;