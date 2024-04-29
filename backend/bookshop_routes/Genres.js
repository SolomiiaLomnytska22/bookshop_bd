const express = require("express");
const router = express.Router();
const genresController = require("../bookshop_controllers/Genres.js");

router.route("/").get(genresController.getAllGenres).post(genresController.createGenre);

router
  .route("/:id")
  .get(genresController.getGenreByID)
  .delete(genresController.deleteGenre)
  .put(genresController.updateGenre);

module.exports = router;
