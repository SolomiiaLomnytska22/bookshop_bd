const express = require("express");
const router = express.Router();
const bookController = require("../bookshop_controllers/Books.js");
const verifyRoles = require("../bookshop_middleware/VerifyRole.js")
const ROLES_LIST = require('../config/roles.js');

router.route("/").get(bookController.getAllBooks).post(bookController.createBook);

router
  .route("/:isbn")
  .get(bookController.getBookByISBN)
  .delete(verifyRoles(ROLES_LIST.Admin), bookController.deleteBook)
  .put(verifyRoles(ROLES_LIST.Admin), bookController.updateBook);

  router
  .route("/genre/:genreId")
  .get(bookController.getBooksByGenre)
module.exports = router;
