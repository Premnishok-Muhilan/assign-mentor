// create a router
const express = require("express");
const mentorController = require("../controllers/mentorController");
const mentorRouter = express.Router();
const checkEmptyBody = require("../middlewares/checkEmptyBody");

// add routes to the router
mentorRouter.get("/:id/get-students", mentorController.getStudents);
mentorRouter.post(
  "/create-mentor",
  checkEmptyBody,
  mentorController.createMentor
);
mentorRouter.post("/:id/assign-students", mentorController.addStudent);

// export the router
module.exports = mentorRouter;
