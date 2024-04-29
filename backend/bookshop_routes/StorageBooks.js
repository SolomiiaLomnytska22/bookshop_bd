const express = require("express");
const router = express.Router();
const storageBooksController = require("../bookshop_controllers/StorageBooks.js");

router.route("/").get(storageBooksController.getAllStorageBooks).post(storageBooksController.createStorageBook);

router
  .route("/:id")
  .get(storageBooksController.getStorageBookByISBN)
  .delete(storageBooksController.deleteStorageBook)
  .put(storageBooksController.updateStorageBook);

module.exports = router
