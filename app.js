// import the express module
const express = require("express");
const mentorRouter = require("./routes/mentorRoutes");
const studentRouter = require("./routes/studentRoutes");

// create an express application
const app = express();

// use the express middleware for parsing json data
app.use(express.json());

app.get("/api/v1", (request, response) => {
  response.send("Hello using experss JS");
});

app.use("/api/v1/mentor", mentorRouter);
app.use("/api/v1/student", studentRouter);

module.exports = app;
