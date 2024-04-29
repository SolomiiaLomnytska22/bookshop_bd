const express = require("express");
const router = express.Router();
const booksGenresController = require("../bookshop_controllers/Books_Genres.js");

router.route("/").get(booksGenresController.getAllBooksGenres).post(booksGenresController.createBooksGenres);

router
  .route("/:id")
  .delete(booksGenresController.deleteBooksGenres);

module.exports = router;
