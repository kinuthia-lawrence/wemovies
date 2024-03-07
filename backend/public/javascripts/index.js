// this is the database code
// mongodb+srv://Larrycodes:<password>@cluster0.djpqtlg.mongodb.net/?retryWrites=true&w=majority

import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";//this is the file that we will create to access the database(data access objects)

const MongoClient = mongodb.MongoClient;