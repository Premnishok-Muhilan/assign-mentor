const mongoose = require("mongoose");

//define a schema
const studentsSchema = new mongoose.Schema({
    student_name: String,
    previous_mentor_ids: { type: [String], default: [] },
    mentor_id: { type: String, default: '' },
    mentor_name: { type: String, default: '' },
});
// const todoSchema = new mongoose.Schema({
//   description: String,
//   status: {
//     type: Boolean,
//     default: false,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

//create a model and export it
//mongoose.model(name_of_model,schema,collection_name)
// module.exports = mongoose.model("Todo", todoSchema, "todos");
module.exports = mongoose.model("Students", studentsSchema, "Students");
