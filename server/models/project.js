import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    unique: [true, 'Project Exists'],
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  category: {
    type: String,
    required: true,
  },
  images:
  {
    type: [String],
    required: true
  },
  audio: {type: String},
  preview_image: {
    type: String
  }
},
);

export default mongoose.model('Project', projectSchema);
