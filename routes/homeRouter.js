const express = require("express");
const homeRouter = express.Router();

const homeController = require("../controllers/homeController");

homeRouter.get("/", homeController.getHome);
homeRouter.get("/about", homeController.getAbout);
homeRouter.get("/contact", homeController.getContact);
homeRouter.post("/contact", homeController.postContact);

module.exports = homeRouter;
