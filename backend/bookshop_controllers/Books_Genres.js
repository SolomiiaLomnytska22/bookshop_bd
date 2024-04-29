const { Books_Genres } = require("../bookshop_models/");

exports.getAllBooksGenres = async (req, res) => {
  try {
    const booksGenres = await Books_Genres.findAll();

    const responseBody = booksGenres.map((booksGenre) => ({
      Books_ISBN: booksGenre.Books_ISBN,
      Genres_GenreID: booksGenre.Genres_GenreID,
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

exports.createBooksGenres = async (req, res) => {
  try {
    console.log("Creating a new Books_Genres relationship");
    console.log(req.body);
    const { Books_ISBN, Genres_GenreID } = req.body;
    if (!Books_ISBN || !Genres_GenreID) {
      return res.status(400).json({
        error: "Something is missing",
      });
    }

    const newBooksGenres = await Books_Genres.create(
      {
        Books_ISBN,
        Genres_GenreID,
      }
    );

    const responseBody = {
      Books_ISBN: newBooksGenres.Books_ISBN,
      Genres_GenreID: newBooksGenres.Genres_GenreID,
    };

    res.status(201).json(responseBody);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteBooksGenres = async (req, res) => {
  try {
    const { Books_ISBN, Genres_GenreID } = req.params;
    console.log(Books_ISBN, Genres_GenreID);
    const booksGenres = await Books_Genres.findOne({
      where: {
        Books_ISBN,
        Genres_GenreID
      }
    });

    if (!booksGenres) {
      return res.status(404).json({
        error: "Books_Genres relationship not found.",
      });
    }

    await booksGenres.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
