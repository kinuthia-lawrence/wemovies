//connect to database(mongodb)

import mongodb from "mongodb";
const objectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`);
    }
  }

  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        movieId: movieId,
        user: user,
        review: review,
      };
      return await reviews.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to add review: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: objectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review:${e}`);
      return { error: e };
    }
  }
  static async updateReview(reviewId, user, review) {
    console.log("rev", reviewId);
    try {
      const updateResponse = await reviews.updateOne(
        { _id: objectId(reviewId) },
        { $set: { user: user, review } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try{
        const deleteResponse = await reviews.deleteOne({ _id: objectId(reviewId) });

        return deleteResponse;
    }catch(e){
        console.error(`Unable to delete review: ${e}`);
        return {error: e};
    }
  }

  static async getReviewsByMovieId(movieId){
    console.log("mov", movieId)
    try{
        const cursor = await reviews.find({movieId: parseInt(movieId)});
        return cursor.toArray();
    }catch(e){
        console.error(`Unable to get reviews: ${e}`);
        return {error: e}
    }
   }
}
