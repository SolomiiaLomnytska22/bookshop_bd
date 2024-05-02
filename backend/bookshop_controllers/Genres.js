const { Genres, Books_Genres } = require("../bookshop_models/");

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genres.findAll();

    const responseBody = genres.map((genre) => ({
      GenreID: genre.GenreID,
      Name: genre.Name,
      Description: genre.Description,
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

exports.getGenreByID = async (req, res) => {
  try {
    const genreId = req.params.id;
    console.log(`Getting genre with ID: ${genreId}`);

    if (isNaN(genreId)) {
      return res.status(400).json({
        error: "Invalid genre ID.",
      });
    }

    const genre = await Genres.findByPk(genreId);

    if (!genre) {
      return res.status(404).json({
        error: "Genre not found.",
      });
    }

    const responseBody = {
      GenreID: genre.GenreID,
      Name: genre.Name,
      Description: genre.Description,
    };

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};


exports.getGenreByISBN = async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    console.log(`Getting genre with ID: ${ISBN}`);

    if (isNaN(ISBN)) {
      return res.status(400).json({
        error: "Invalid genre ID.",
      });
    }

    const genres_ids = await Books_Genres.findAll({ where: { Books_ISBN: ISBN } });
   
    const genres= [];

    for (let j = 0; j < genres_ids.length; j++) {
      const genreItem = await Genres.findByPk(genres_ids[j].Genres_GenreID);
      genres.push(genreItem);
    }

    if (!genres) {
      return res.status(404).json({
        error: "Genre not found.",
      });
    }

  
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createGenre = async (req, res) => {
  try {
    console.log("Creating a new genre");
    console.log(req.body);
    const { Name, Description } = req.body;
    if (!Name) {
      return res.status(400).json({
        error: "Name is required",
      });
    }

    const newGenre = await Genres.create({
      Name,
      Description,
    });

    res.status(201).json(newGenre);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    console.log(genreId);
    const genre = await Genres.findByPk(genreId);

    await genre.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const { Name, Description } = req.body;

    const genre = await Genres.findByPk(genreId);

    genre.Name = Name;
    genre.Description = Description;

    await genre.save();

    return res.status(200).json(genre);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
