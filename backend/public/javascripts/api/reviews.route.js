
//creating route
import express from "express";
import ReviewsCtrl from "./reviews.controller.js";

const router = express.Router(); //this will route the request to different parts of the application when user visit url

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews)//this is a get request
router.route("/new").post(ReviewsCtrl.apiCreateReview)
router.route("/:id")
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router;