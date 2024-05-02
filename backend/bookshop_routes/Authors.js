const express = require("express");
const router = express.Router();
const authorsController = require("../bookshop_controllers/Authors.js");

router.route("/").get(authorsController.getAllAuthors).post(authorsController.createAuthor);

router
  .route("/:id")
  .get(authorsController.getAuthorByID)
  .delete(authorsController.deleteAuthor)
  .put(authorsController.updateAuthor);

  router
  .route("/isbn/:isbn")
  .get(authorsController.getAuthorByISBN)
module.exports = router;
