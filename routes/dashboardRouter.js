const express = require("express");
const dashboardRouter = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

const dashboardController = require("../controllers/dashboardController");

dashboardRouter.get("/dashboard", isLoggedIn, dashboardController.getDashboard);
dashboardRouter.get(
  "/donor/edit",
  isLoggedIn,
  dashboardController.getEditDonor,
);
dashboardRouter.post(
  "/donor/edit",
  isLoggedIn,
  dashboardController.postEditDonor,
);

module.exports = dashboardRouter;
