// Import Required Modules
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const session = require("express-session");

// Import Routes
const homeRouter = require("./routes/homeRouter");
const authRouter = require("./routes/authRouter");
const donorRouter = require("./routes/donorRouter");
const requestRouter = require("./routes/requestRouter");
const dashboardRouter = require("./routes/dashboardRouter");

//Import Utilities
const ExpressError = require("./utils/ExpressError");

//Express App Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//Session Configuration
app.use(
  session({
    secret: "lifelink-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

// Global Variable For Views
app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

//Routes
app.use(homeRouter);
app.use(authRouter);
app.use(donorRouter);
app.use(requestRouter);
app.use(dashboardRouter);

// 404 middleware
app.use((req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Error middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode);
  if (statusCode === 404) {
    return res.render("error/404", {
      title: "Server Error",
      message,
    });
  }
  res.render("error/500", {
    title: "Server Error",
    message,
  });
});

//Server Port
const PORT = process.env.PORT || 3000;

//Connect Database & Start Server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Your Server Is Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Ocuure While Connecting To Database", err);
  });
