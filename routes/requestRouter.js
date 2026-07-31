const express = require("express");
const requestRouter = express.Router();
const requestController = require("../controllers/requestController");
const isLoggedIn = require("../middlewares/isLoggedIn");

requestRouter.get(
  "/requests/create",
  isLoggedIn,
  requestController.getCreateRequest,
);
requestRouter.post(
  "/requests/create",
  isLoggedIn,
  requestController.postCreateRequest,
);
requestRouter.get("/requests/my", isLoggedIn, requestController.getMyRequest);
requestRouter.get(
  "/requests/delete/:id",
  isLoggedIn,
  requestController.getDeleteRequest,
);

module.exports = requestRouter;
