const express = require("express");
const router = express.Router();

const shopController = require('../controllers/shop')
const Product = require("../schemas/Product");
const verifyToken = require("../middleware/auth");

router.delete('/deleteUser', verifyToken, shopController.deleteUser)

router.get("/cabinet", verifyToken, (req, res) => {
  res.render("cabinet");
});

router.get("/product/:prodId", async (req, res) => {
  res.render("product", {
    thisProd: await Product.findOne({ _id: req.params.prodId }),
  });
});

router.get("/products", async (req, res) => {
  res.render("products", { products: await Product.find() });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/cart", verifyToken, (req, res) => {
  res.render("cart");
});

router.get("/", async (req, res) => {
  res.render("index", { products: await Product.find() });
});


module.exports = router;
