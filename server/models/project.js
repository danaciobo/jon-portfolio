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
    minlength: 50,
  },
  category: {
    type: String,
    required: true,
  },
  images:
     {
      type: [String],
      required: true
    }
});

export default mongoose.model('Project', projectSchema);
