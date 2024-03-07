import ReviewsDAO from "../dao/reviewsDAO.js";// what we'll sue to access the database

export default class ReviewsController { // a class is used to create multiple functions
    //the first function,static->you can  call directly from the reviewsContoller, if it was not static, you could create an instance
  static async apiPostReview(req, res, next) {// this route is in the reviews.route.js file
    try {
      const movieId = parseInt(req.body.movieId);
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.addReview(movieId, user, review);//since its an async, we wait things to happen
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  //the second function
  static async apiGetReview(req, res, next){
    try{
        let id = req.params.id || {};
        let review =await ReviewsDAO.getReview(id);
        if(!review){
            res.status(404).json({error: "Review not found"});
            return;
        }
        res.json(review);
    }catch(e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
    }
  }

  // the third function
  static async apiUpdateReview(req, res, next){
    try{
        const reviewId = req.params.id;
        const review = req.body.review;
        const user = req.body.user;

        const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            user,
            review
        )

        var{error}= reviewResponse
        if (error) {
            res.status(400).json({error})
        }

        if(reviewResponse.modifiedCount === 0){
            throw new Error(
                "unable to update review"
            )
        }
        res.json({status: "success"})
    }catch(e){
        res.status(500).json({error: e.message})
    }
  }

  //the fourth function
  static async apiDeleteReview(req, res, next){
    try{
        const reviewId = req.params.id;
        const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
        res.json({status: "success"})
    }catch(e){
        res.status(500).json({error: e.message})
    }
   }

   static async apiGetReview(req, res, next){
    try{
        let id = req.params.id || {};
        let reviews =await ReviewsDAO.getReviewsByMobieId(id);
        if(!reviews){
            res.status(404).json({error: "Review not found"});
            return;
        }
        res.json(reviews);
    }catch(e){
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
    }
   }
}