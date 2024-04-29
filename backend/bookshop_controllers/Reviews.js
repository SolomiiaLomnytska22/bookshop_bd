const { Reviews } = require("../bookshop_models/");

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll();

    const responseBody = reviews.map((review) => ({
      ReviewID: review.ReviewID,
      BookID: review.BookID,
      CustomerID: review.CustomerID,
      Rating: review.Rating,
      ReviewBody: review.ReviewBody,
      Date: review.Date,
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

exports.createReview = async (req, res) => {
  try {
    console.log("Creating a new review");
    console.log(req.body);
    const { BookID, CustomerID, Rating, ReviewBody, Date } = req.body;
    if (!BookID || !CustomerID || !Rating || !Date) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newReview = await Reviews.create({
      BookID,
      CustomerID,
      Rating,
      ReviewBody,
      Date,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    console.log(reviewId);
    const review = await Reviews.findByPk(reviewId);

    await review.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { BookID, CustomerID, Rating, ReviewBody, Date } = req.body;

    const review = await Reviews.findByPk(reviewId);

    review.BookID = BookID;
    review.CustomerID = CustomerID;
    review.Rating = Rating;
    review.ReviewBody = ReviewBody;
    review.Date = Date;

    await review.save();

    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
