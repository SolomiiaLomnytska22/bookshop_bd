const express = require("express");
const router = express.Router();
const reviewsController = require("../bookshop_controllers/Reviews.js");

router.route("/").get(reviewsController.getAllReviews).post(reviewsController.createReview);

router
  .route("/:id")
  //.get(reviewsController.getReviewByID)
  .delete(reviewsController.deleteReview)
  .put(reviewsController.updateReview);

module.exports = router;
