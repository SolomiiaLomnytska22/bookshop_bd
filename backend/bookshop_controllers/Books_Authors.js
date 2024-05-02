const { Books_Authors } = require("../bookshop_models/");

exports.getAllBooksAuthors = async (req, res) => {
  try {
    const booksAuthors = await Books_Authors.findAll();

    const responseBody = booksAuthors.map((booksAuthor) => ({
      Books_ISBN: booksAuthor.Books_ISBN,
      Authors_AuthorID: booksAuthor.Authors_AuthorID,
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

exports.createBooksAuthors = async (req, res) => {
  try {
    console.log("Creating a new Books_Authors relationship");
    console.log(req.body);
    const { Books_ISBN, Authors_AuthorID } = req.body;
    if (!Books_ISBN || !Authors_AuthorID) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    const newBooksAuthors = await Books_Authors.create(
      {
        Books_ISBN,
        Authors_AuthorID,
      }
    );

    const responseBody = {
      Books_ISBN: newBooksAuthors.Books_ISBN,
      Authors_AuthorID: newBooksAuthors.Authors_AuthorID,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteBooksAuthors = async (req, res) => {
  try {
    const { isbn, author } = req.query;
    console.log(isbn, author);
    const booksAuthors = await Books_Authors.findOne({
      where: {
        Books_ISBN: isbn,
        Authors_AuthorID: author
      }
    });

    if (!booksAuthors) {
      return res.status(404).json({
        error: "Books_Authors relationship not found.",
      });
    }

    await booksAuthors.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
