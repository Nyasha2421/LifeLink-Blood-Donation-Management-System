const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const isLoggedIn = require("../middlewares/isLoggedIn");

// GET LOGIN
authRouter.get("/login", authController.getLogin);
// POST LOGIN
authRouter.post("/login", authController.postLogin);

// GET LOGOUT
authRouter.get("/logout", authController.getLogout);

// GET REGISTER
authRouter.get("/register", authController.getRegister);
// POST REGISTER
authRouter.post("/register", authController.postRegister);

// GET BECOME A DONOR
authRouter.get("/become-donor", isLoggedIn, authController.getBecomeDonor);
// POST BECOME A DONOR
authRouter.post("/become-donor", wrapAsync(authController.postBecomeDonor));

module.exports = authRouter;
