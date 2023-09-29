const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const routes = require("./routes");
const path = require("path");
const app = express();
require("./auth");

require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.use(
  session({
    secret:process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/a/auth/protected",
    failureRedirect: "/a/auth/google/failure",
  })
);
app.use("/mobile", routes);
app.use("/admin",routes)

app.listen(5000, () => {
  console.log("Listening on port 3000");
});

//connect to local
mongoose
  .connect("mongodb://localhost:27017/TinyDonation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database...");
  })
  .catch((err) => {
    console.error("Could not connect to Database...");
    console.error(err);
  });
