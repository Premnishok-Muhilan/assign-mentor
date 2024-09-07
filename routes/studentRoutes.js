// create a router
const express = require("express");
const studentController = require("../controllers/studentController");
const studentRouter = express.Router();
const checkEmptyBody = require("../middlewares/checkEmptyBody");

// add routes to the router
studentRouter.post(
  "/create-student",
  checkEmptyBody,
  studentController.createStudent
);
studentRouter.get(
  "/:id/get-previous-mentor-ids",
  studentController.getPreviousMentorIds
);

studentRouter.put(
  "/:id/update-mentor",
  checkEmptyBody,
  studentController.updateMentor
);

// export the router
module.exports = studentRouter;
