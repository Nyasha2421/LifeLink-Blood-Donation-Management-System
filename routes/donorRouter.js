const express = require("express");
const donorRouter = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const isLoggedIn = require("../middlewares/isLoggedIn");
const donorController = require("../controllers/donorController");

donorRouter.get("/donors", isLoggedIn, donorController.getDonors);
donorRouter.get("/donors/:id", donorController.getViewDetails);
donorRouter.get("/donors/edit/:id", donorController.getEditDonor);
donorRouter.post("/donors/edit/:id", donorController.postEditDonor);
donorRouter.get("/donors/delete/:id", donorController.getDeleteDonor);

module.exports = donorRouter;
