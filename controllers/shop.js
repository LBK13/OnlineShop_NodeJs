const User = require("../schemas/User");

exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.cookies.userId });
  res.clearCookie("token");
  res.clearCookie("userId");
  res.redirect("/");
};
