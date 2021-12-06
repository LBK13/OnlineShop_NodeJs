const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoute");

// DB connection import
const db = require("./db")
// Connection to DB
db.connect()

const app = express();

app.set("views", "templates");
app.set("view engine", "pug");

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}))
app.use(express.static(path.join(__dirname, `public`)));
app.use(`/auth`, authRoutes);
app.use(`/admin`, adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.status(404).render("404page");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});