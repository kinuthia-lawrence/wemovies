
//this is the main server code
require('dotenv').config();//config to load the variables from the .env file

import express from "express";
import cors from "cors"
import reviews from "./api/reviews.route.js"//we will create this file

const app = express();//having access to express.


app.use(cors());//use middle ware 
app.use(express.json());//allow json on the body of request

// Routes--the urls that you access to get to send and receive information
app.use("/api/v1/reviews", reviews)//this is the main route-v1 is the version of the api,just incase in the future you createa new api. the reviews show that we are using the reviews.route.js file.
//create a backup route.if someone goes in a route that is not created in the reviews file
app.use("*", (req, res) => 
res.status(404).json({error: "not found"})); //send back an error if it does not find

export default app;// this allows us to access the app in the file that access the database, the file that we will run to get the server running.