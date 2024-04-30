const { StorageBooks } = require("../bookshop_models/");

exports.getAllStorageBooks = async (req, res) => {
  try {
    const storageBooks = await StorageBooks.findAll();

    const responseBody = storageBooks.map((book) => ({
      StorageBookID: book.StorageBookID,
      ISBN: book.ISBN,
      AvailableQuantity: book.AvailableQuantity,
      NextDeliveryDate: book.NextDeliveryDate,
      UnitPrice: book.UnitPrice,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.getStorageBookByISBN = async (req, res) => {
console.log(req.params.id)
  try {
    const storageBooks = await StorageBooks.findOne({where: {
      ISBN: req.params.id
    }});

    res.status(200).json(storageBooks);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.getStorageBookByID = async (req, res) => {
  console.log(req.params.id)
    try {
      const storageBooks = await StorageBooks.findByPk(req.params.id);
  
      res.status(200).json(storageBooks);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        body: {
          status: "error",
          message: "Internal Server Error",
        },
      });
    }
  };

exports.createStorageBook = async (req, res) => {
  try {
    console.log("Creating a new storage book");
    console.log(req.body);
    const { ISBN, AvailableQuantity, NextDeliveryDate, UnitPrice } = req.body;
    if (!ISBN || !AvailableQuantity || !NextDeliveryDate || !UnitPrice) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newStorageBook = await StorageBooks.create({
      ISBN,
      AvailableQuantity,
      NextDeliveryDate,
      UnitPrice,
    });

    res.status(201).json(newStorageBook);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteStorageBook = async (req, res) => {
  try {
    const storageBookId = req.params.id;
    console.log(storageBookId);
    const storageBook = await StorageBooks.findByPk(storageBookId);

    await storageBook.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateStorageBook = async (req, res) => {
  try {
    const storageBookId = req.params.id;
    const { ISBN, AvailableQuantity, NextDeliveryDate, UnitPrice } = req.body;

    const storageBook = await StorageBooks.findByPk(storageBookId);

    storageBook.ISBN = ISBN;
    storageBook.AvailableQuantity = AvailableQuantity;
    storageBook.NextDeliveryDate = NextDeliveryDate;
    storageBook.UnitPrice = UnitPrice;

    await storageBook.save();

    return res.status(200).json(storageBook);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
