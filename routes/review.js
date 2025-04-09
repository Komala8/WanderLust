const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");

//REVIEW
//POST REVIEW ROUTE
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.postReview));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.deleteReview));

module.exports = router;