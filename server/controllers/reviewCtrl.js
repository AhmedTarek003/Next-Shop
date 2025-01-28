const Review = require("../models/reviewModel");

exports.addReviewCtrl = async (req, res) => {
  const { product, rating, comment } = req.body;
  const { _id } = req.user;
  try {
    const review = await Review.findOne({ $and: [{ product }, { user: _id }] });
    if (review) {
      return res
        .status(400)
        .json({ msg: "you already added a review on this product" });
    }
    const newReview = new Review({
      product,
      user: _id,
      rating,
      comment,
    });

    await newReview.save();
    res
      .status(201)
      .json({ msg: "Review added successfully", review: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to add review" });
  }
};

exports.getAllReviewsCtrl = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", [
      "_id",
      "name",
      "email",
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get all reviews" });
  }
};

exports.getReviewCtrl = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(400).json({ msg: "review not found" });
    if (_id !== review.user.toString())
      return res.status(403).json({ msg: "access denied" });
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to get review" });
  }
};

exports.updateReviewCtrl = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { rating, comment } = req.body;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(400).json({ msg: "review not found" });
    if (_id !== review.user.toString())
      return res.status(403).json({ msg: "access denied" });
    const newReview = await Review.findByIdAndUpdate(
      id,
      {
        $set: {
          rating,
          comment,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "your review has been updated", review: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to update review" });
  }
};

exports.deleteReviewCtrl = async (req, res) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  try {
    const review = await Review.findById(id);
    if (!review) return res.status(400).json({ msg: "review not found" });
    if (role === "user" && _id !== review.user.toString())
      return res.status(403).json({ msg: "access denied" });
    await review.deleteOne();
    res.status(200).json({ msg: "review deleted successfully", review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error to delete review" });
  }
};
