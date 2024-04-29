const { Authors } = require("../bookshop_models/");

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Authors.findAll();

    const responseBody = authors.map((author) => ({
      AuthorID: author.AuthorID,
      FirstName: author.FirstName,
      LastName: author.LastName,
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

exports.getAuthorByID = async (req, res) => {
  try {
    const authorId = req.params.id;
    console.log(`Getting author with ID: ${authorId}`);

    if (isNaN(authorId)) {
      return res.status(400).json({
        error: "Invalid author ID.",
      });
    }

    const author = await Authors.findByPk(authorId);

    if (!author) {
      return res.status(404).json({
        error: "Author not found.",
      });
    }
    const responseBody = {
      AuthorID: author.AuthorID,
      FirstName: author.FirstName,
      LastName: author.LastName,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    console.log("Creating a new author");
    console.log(req.body);
    const { FirstName, LastName } = req.body;
    if (!FirstName || !LastName) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    const newAuthor = await Authors.create(
      {
        FirstName,
        LastName,
      },
      {
        fields: ["FirstName", "LastName"],
      }
    );

    const responseBody = {
      AuthorID: newAuthor.AuthorID,
      FirstName: newAuthor.FirstName,
      LastName: newAuthor.LastName,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    console.log(authorId);
    const author = await Authors.findByPk(authorId);

    await author.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { FirstName, LastName } = req.body;

    const author = await Authors.findByPk(authorId);

    author.FirstName = FirstName;
    author.LastName = LastName;

    await author.save();

    return res.status(200).json({
      AuthorID: author.AuthorID,
      FirstName: author.FirstName,
      LastName: author.LastName,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
