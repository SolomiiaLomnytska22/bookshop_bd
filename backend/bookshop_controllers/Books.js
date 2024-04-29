const { Books, Authors, Books_Authors, Books_Genres, Publishers, StorageBooks, Genres } = require("../bookshop_models/");

exports.getAllBooks = async (req, res) => {
  try {
    let books = await Books.findAll();
    
    for (let i = 0; i < books.length; i++) {
      const authors = await Books_Authors.findAll({ where: { Books_ISBN: books[i].ISBN } });
      const authorNames = [];

      for (let j = 0; j < authors.length; j++) {
        const authorItem = await Authors.findOne({ where: { AuthorID: authors[j].Authors_AuthorID } });
        authorNames.push(authorItem.FirstName + ' ' + authorItem.LastName);
      }
      const book_storage = await StorageBooks.findOne({ where: { ISBN: books[i].ISBN } })
      books[i].dataValues.Price = book_storage.UnitPrice;
      books[i].dataValues.AuthorNames = authorNames;
    }
    
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getBooksByGenre = async (req, res) => {
  try {
    const bookIds = await Books_Genres.findAll({ where: { Genres_GenreID: req.params.genreId } });

    let books = []

    for (let j = 0; j < bookIds.length; j++) {
      const genreItem = await Books.findByPk(bookIds[j].Books_ISBN);
      books.push(genreItem);
    }
    
    for (let i = 0; i < books.length; i++) {
      const authors = await Books_Authors.findAll({ where: { Books_ISBN: books[i].ISBN } });
      const authorNames = [];

      for (let j = 0; j < authors.length; j++) {
        const authorItem = await Authors.findOne({ where: { AuthorID: authors[j].Authors_AuthorID } });
        authorNames.push(authorItem.FirstName + ' ' + authorItem.LastName);
      }
      const book_storage = await StorageBooks.findOne({ where: { ISBN: books[i].ISBN } })
      books[i].dataValues.Price = book_storage.UnitPrice;
      books[i].dataValues.AuthorNames = authorNames;
    }
    
    res.status(200).json(books);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getBookByISBN = async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    console.log(`Getting book with ISBN: ${ISBN}`);

    const book = await Books.findByPk(ISBN);

    const authors = await Books_Authors.findAll({ where: { Books_ISBN: book.ISBN } });
    const genres = await Books_Genres.findAll({ where: { Books_ISBN: book.ISBN } });
    const authorNames = [];
    const bookGenres = [];

    for (let j = 0; j < authors.length; j++) {
      const authorItem = await Authors.findOne({ where: { AuthorID: authors[j].Authors_AuthorID } });
      authorNames.push(authorItem.FirstName + ' ' + authorItem.LastName);
    }

    for (let j = 0; j < genres.length; j++) {
      const genreItem = await Genres.findOne({ where: { GenreID: genres[j].Genres_GenreID } });
      bookGenres.push(genreItem.Name);
    }

    const book_storage = await StorageBooks.findOne({ where: { ISBN: book.ISBN } })
    const book_publisher = await Publishers.findOne({ where: { PublisherID: book.PublisherID } })
    book.dataValues.Price = book_storage.UnitPrice;
    book.dataValues.Publisher = book_publisher.PublisherName;
    book.dataValues.AuthorNames = authorNames;
    book.dataValues.Genres = bookGenres;


    if (!book) {
      return res.status(404).json({
        error: "Book not found.",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    console.log("Creating a new book");
    console.log(req.body);
    const { ISBN, Title, Language, Pages, PublicationDate, PublisherID } = req.body;
    if (!ISBN || !Title || !Language || !PublicationDate || !PublisherID) {
      return res.status(400).json({
        error: "Some required fields are missing",
      });
    }

    const newBook = await Books.create({
      ISBN,
      Title,
      Language,
      Pages,
      PublicationDate,
      PublisherID,
      CoverImageURL
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    console.log(ISBN);
    const book = await Books.findByPk(ISBN);

    await book.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const ISBN = req.params.isbn;
    const { Title, Language, Pages, PublicationDate, PublisherID, CoverImageURL } = req.body;

    const book = await Books.findByPk(ISBN);

    book.Title = Title;
    book.Language = Language;
    book.Pages = Pages;
    book.PublicationDate = PublicationDate;
    book.PublisherID = PublisherID;
    book.CoverImageURL = CoverImageURL

    await book.save();

    return res.status(200).json(book);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
