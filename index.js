//BACKEND SERVER USING EXPRESS.JS
const app = require("./app");

const { MONGO_DB_URL, PORT } = require("./utils/config");

//import mongoose
const mongoose = require("mongoose");

//import dotenv
require("dotenv").config();

//open connection with mongoDB
mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
    //start the server and listen on port
    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Couldn't connect to MongoDB Atlas.Error: ", error);
  });
