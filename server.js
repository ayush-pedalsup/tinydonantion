const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const routesMobile = require("./routes/mobile");
const routesAdmin = require("./routes/admin");
const path = require("path");
const app = express();
const { PORT } = require("./config");
const constants = require("./utils/constants");
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
    secret: process.env.secret_key,
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
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/mobile/auth/protected",
    failureRedirect: "/mobile/auth/google/failure",
  })
);
app.use("/mobile", routesMobile);
app.use("/admin", routesAdmin);

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });

//connect to local
// mongoose
//   .connect("mongodb://localhost:27017/tinyDonation", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to Database...");
//   })
//   .catch((err) => {
//     console.error("Could not connect to Database...");
//     console.error(err);
//   });

// Connect to MongoDB production
// const connection_string = `mongodb://${
//   process.env.DB_USER
// }:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_SERVER}:${
//   process.env.DB_PORT
// }/${process.env.DB_NAME}`;

// console.log(connection_string);

mongoose
  .connect(
    "mongodb+srv://ayushpandey:nBR3Z4GUfSfsaBYz@tinydonation.l1otykk.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Database...");
  })
  .then(() => {
    let serverConfig = process.env.DEV_ENV;
    let httpsServer;
    if (serverConfig != constants.LOCAL_DEV_ENV) {
      httpsServer = https.createServer(
        {
          //key: fs.readFileSync(process.env.SSL_PRIV_KEY),
          //cert: fs.readFileSync(process.env.SSL_FULLCHAIN_KEY),
        },
        app
      );
    }

    //start the respective server
    if (serverConfig === constants.LOCAL_DEV_ENV) {
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } else if (
      serverConfig === constants.STAGING_DEV_ENV ||
      serverConfig === constants.PROD_DEV_ENV
    ) {
      httpsServer.listen(process.env.PORT, () => {
        console.log(`HTTPS Server running on port ${process.env.PORT}`);
      });
    } else {
      console.log("please check your .env file for the specification");
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error("Could not connect to Database...");
    console.error(err);
    process.exit(1); // Stop the server and exit the process
  });

//module.exports = app;
