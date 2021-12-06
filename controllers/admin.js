const Product = require("../schemas/Product");

exports.getAddProduct = (req, res) => {
  res.render("add-product");
};

exports.postAddProduct = async (req, res) => {
  const { imgUrl, imgUrls, title, price, desc, code, color, sizes } = req.body;

//   const prod = await Product.findOne({ code });

  const newProduct = await Product.create({
      imgUrl, imgUrls, title, price, desc, code, color, sizes
  })

  res.send(newProduct)

  
};
