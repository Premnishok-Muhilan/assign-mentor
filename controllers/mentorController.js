const Mentor = require("../models/mentor");
const Student = require("../models/student");

const mentorController = {
  createMentor: async (req, res) => {
    try {
      // console.log(req.body);

      // get mentor_name from the request body
      const { mentor_name } = req.body;

      // check to see if the mentor_name is empty
      if (!mentor_name) {
        return res
          .status(404)
          .send({ message: "Mentor name cannot be empty!" });
      }

      //create a new mentor
      const newMentor = new Mentor({
        mentor_name,
      });

      // save the mentor to the database
      const savedMentor = await newMentor.save();

      // send the saved todo as a response
      res.send({ message: "Mentor created successfully", mentor: savedMentor });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  addStudent: async (req, res) => {
    // mentor id is received from url params
    // student ids are received from the request body
    try {
      console.log("\naddStudent\n");
      // get the mentor id from params
      const mentorId = req.params.id;
      console.log("mentorId", mentorId);
      console.log(typeof mentorId);

      // find the mentor
      const mentor = await Mentor.findById(mentorId);

      // Check if the mentor was found
      if (!mentor) {
        return res.status(404).send({ message: "Mentor not found" });
      } else {
        console.log("Mentor id is valid");
        // student ids from the request body
        // it may contain random ids
        // so we need to get only the valid ids from this array
        const student_ids_array = req.body.student_ids;
        console.log("student_ids_array", student_ids_array);

        // array to hold valid ids
        const valid_student_ids_array = [];

        //check to see if the student id is valid
        for (let i = 0; i < student_ids_array.length; i++) {
          console.log(student_ids_array[i]);
          const valid_student_id = await Student.findById(student_ids_array[i]);

          if (valid_student_id) {
            valid_student_ids_array.push(student_ids_array[i]);
          }
        }
        console.log("valid_student_ids_array", valid_student_ids_array);

        // mentor.student_ids.push(...verified_student_ids_array);

        // set the mentor to each verified student id
        for (let i = 0; i < valid_student_ids_array.length; i++) {
          console.log("inside for loop");
          const student_id = valid_student_ids_array[i];
          console.log(student_id);

          // Find the student
          const student = await Student.findById(student_id);

          // CHECK TO SEE IF EACH OF THE
          // INDIVUDUAL VALID STUDENT HAS A MENTOR
          if (student.mentor_id === "") {
            console.log(
              `Student ${student_id} ${student.student_name} doesn't have a mentor`
            );
            //Set the mentor in each student
            student.mentor_id = mentorId;
            student.mentor_name = mentor.mentor_name;

            // save the mentor to the database
            await student.save();

            // Add the student id to the mentor object having the student_ids array
            mentor.student_ids.push(student_id);

            // console.log("after setting the mentor id", student);
          } else {
            console.log(
              `Student ${student_id} ${student.student_name} already has a mentor assigned`
            );
          }
        }

        // removes the duplicate student ids
        mentor.student_ids = [...new Set(mentor.student_ids)];
        // save the mentor to the database
        const savedMentor = await mentor.save();

        res.status(200).json({ message: savedMentor });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getStudents: async (req, res) => {
    try {
      // Get the mentor id from params
      const mentorId = req.params.id;
      console.log(mentorId);

      // Find the mentor
      const mentor = await Mentor.findById(mentorId);

      // Check if the mentor was found
      if (!mentor) {
        return res.status(404).send({ message: "Mentor not found" });
      } else {
        const all_students = [];

        for (let i = 0; i < mentor.student_ids.length; i++) {
          const student_id = mentor.student_ids[i];
          const student = await Student.findById(student_id);

          all_students.push(student.student_name);
        }

        // const all_students = mentor.student_ids;
        return res.status(200).send({ all_students });
      }

      // Send the mentor data
      // res.send({ mentor });
    } catch (error) {
      // Handle unexpected errors
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = mentorController;
