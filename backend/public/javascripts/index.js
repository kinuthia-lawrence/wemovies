
// this is the database code

import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js";//this is the file that we will create to access the database(data access objects)

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env.MONGO_USERNAME;//you can access using the dot method or ass used in password.
const mongo_password = process.env['MONGO_PASSWORD'];
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.djpqtlg.mongodb.net/?retryWrites=true&w=majority`

//port
const port = 8000;

//connect to database
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //max number of connections in pool(amout of people who can be connected in one time)
        wtimeoutMS: 2500, ////2500ms timeout for write operations, 
        useNewUrlParser: true  //use new url parser to connect to the database
    })
    .catch(err =>{
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () =>{
            console.log("listening on port " + port);
        })
    })