
const express= require('express');
const router = express.Router({mergeParams:true});
const catchAsync = require('../utils/catchAsync')
const ExpressError=require('../utils/ExpressError')
const Campground = require('../models/campground')
const Review = require('../models/review.js')
const {reviewSchema}=require('../schemas.js');
const {validateReview,isLoggedIn,isReviewAuthor}= require('../middleware.js')
const reviews = require('../controllers/reviews.js')
router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview));


router.delete('/:reviewId',isReviewAuthor,isLoggedIn, catchAsync(reviews.deleteReview));

module.exports=router;