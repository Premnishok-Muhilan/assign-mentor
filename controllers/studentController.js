const Student = require("../models/student");
const Mentor = require("../models/mentor");

const studentController = {
  createStudent: async (req, res) => {
    try {
      //get the student name from the request body
      const { student_name } = req.body;
      console.log(student_name);

      // check to see if the student_name key exists
      if (student_name === undefined) {
        res.status(404).send({ message: "student_name key is missing!" });
      } else {
        // check to see if the student_name is empty
        if (!student_name) {
          return res
            .status(404)
            .send({ message: "Student name cannot be empty!" });
        }
      }

      //create a new student
      const newStudent = new Student({
        student_name,
      });

      // save the student to the database
      const savedStudent = await newStudent.save();

      // send the saved todo as a response
      res.send({
        message: "Student created successfully",
        student: savedStudent,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getPreviousMentorIds: async (req, res) => {
    try {
      // Get the mentor id from params
      const studentId = req.params.id;

      // Validate studentId (e.g., check if it’s a valid MongoDB ObjectId)
      if (!studentId) {
        return res.status(400).send({ message: "Student ID is required" });
      }

      // Find the student
      const student = await Student.findById(studentId);

      // Check if the student was found
      if (!student) {
        return res.status(404).send({ message: "Student doesn't exist" });
      }

      const previous_mentor_ids = student.previous_mentor_ids;

      // Send the mentor data
      res.send({ previous_mentors: previous_mentor_ids });
    } catch (error) {
      // Handle unexpected errors
      res.status(500).send({ message: error.message });
    }
  },
  updateMentor: async (req, res) => {
    try {
      // Get the mentor id from params
      const studentId = req.params.id;

      // Find the student
      const student = await Student.findById(studentId);

      // Check if the student was found
      if (!student) {
        return res.status(404).send({ message: "Student doesn't exist" });
      } else {
        if (student.mentor_id === "") {
          return res
            .status(400)
            .send({
              message:
                "There's no mentor id assigned to the student! Use the add student method from the mentorController",
            });
        }
        console.log("student id is valid");
        const new_mentor_id = req.body.mentor_id;

        const new_mentor = await Mentor.findById(new_mentor_id);
        console.log("new_mentor", new_mentor);

        if (!new_mentor) {
          return res.status(404).send({ message: "Mentor doesn't exist" });
        } else {
          // new mentor exists
          console.log("mentor id is valid");

          // get the old mentor id of student
          const old_mentor_id = student.mentor_id;

          // SET THE NEW MENTOR ID AND MENTOR NAME IN STUDENT AND APPEND THE OLD MENTOR ID TO PREV MENTOR ID
          //append the old_mentor_id to the previous_mentor_ids array inside student
          student.previous_mentor_ids.push(old_mentor_id);

          // set the mentor id and mentor name of the student to new details
          console.log("new_mentor.mentor_id", new_mentor.mentor_id);
          student.mentor_id = new_mentor_id;

          student.mentor_name = new_mentor.mentor_name;

          // save the student
          await student.save();

          // DELETING THE STUDENT ID FROM THE OLD MENTOR'S MENTOR ID ARRAY I
          //delete the student id from the old mentor's student_ids array
          const old_mentor = await Mentor.findById(old_mentor_id);
          console.log("old mentor", old_mentor);

          const old_student_ids = old_mentor.student_ids;
          console.log("old_student_ids", old_student_ids);

          const updated_student_ids = old_student_ids.filter(
            (id) => id !== studentId
          );
          old_mentor.student_ids = updated_student_ids;

          console.log("old mentor collection after change", old_mentor);
          // save the old_mentor
          await old_mentor.save();

          // UPDATE THE STUDENT ID OF THE STUDENT IDS ARRAY OF THE NEW MENTOR
          new_mentor.student_ids.push(studentId);

          await new_mentor.save();

          res.send("success");
        }
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = studentController;
