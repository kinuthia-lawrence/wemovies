
//creating route
import express from "express";

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello World"));// get request to api will return hello world

export default router;