const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../schemas/User");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(409).send("No user found");
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { user_id: user._id, username: user.username },
      String(process.env.TOKEN_KEY),
      {
        expiresIn: "2h",
      }
    );
    // user.token = token;
    res.cookie("token", token);
    res.cookie('userId', user._id)
    res.redirect("/cabinet");
  }
};

exports.postRegister = async (req, res) => {
  const { username, password, fullName, phoneNumber } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(409).send("User already exists!");

  const encryptedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    password: encryptedPassword,
    fullName,
    phoneNumber,
    isAdmin: false,
  });

  const token = jwt.sign(
    { user_id: newUser._id, username: newUser.username },
    String(process.env.TOKEN_KEY),
    {
      expiresIn: "2h",
    }
  );

  res.cookie("token", token);
  res.cookie('userId', newUser._id)
  res.redirect("/cabinet");
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("userId");
  res.redirect("/");
};
