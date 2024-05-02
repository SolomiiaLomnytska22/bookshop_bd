const express = require("express");
const router = express.Router();
const booksAuthorsController = require("../bookshop_controllers/Books_Authors.js");

router.route("/")
.get(booksAuthorsController.getAllBooksAuthors)
.post(booksAuthorsController.createBooksAuthors)
.delete(booksAuthorsController.deleteBooksAuthors)

module.exports = router;
