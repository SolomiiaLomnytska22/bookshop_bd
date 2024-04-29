const express = require("express");
const router = express.Router();
const postServicesController = require("../bookshop_controllers/PostServices.js");

router.route("/").get(postServicesController.getAllPostServices).post(postServicesController.createPostService);

router
  .route("/:id")
  .get(postServicesController.getPostServiceById)
  .delete(postServicesController.deletePostService)
  .put(postServicesController.updatePostService);

module.exports = router;
