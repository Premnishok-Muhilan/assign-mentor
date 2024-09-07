const mongoose = require("mongoose");

//define a schema
const mentorsSchama = new mongoose.Schema({
  mentor_name: String,
  student_ids: { type: [String], default: [] },
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
module.exports = mongoose.model("Mentors", mentorsSchama, "Mentors");
