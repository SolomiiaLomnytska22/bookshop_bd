const express = require("express");
const router = express.Router();
const userLoginsController = require("../bookshop_controllers/UserLogins.js");

router.route("/").get(userLoginsController.getAllUserLogins).post(userLoginsController.createUserLogin);

router
  .route("/:id")
  //.get(userLoginsController.getUserLoginByID)
  .delete(userLoginsController.deleteUserLogin)
  .put(userLoginsController.updateUserLogin);

module.exports = router;
