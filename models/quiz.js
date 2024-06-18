import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
  questionType: { type: String, enum: ['multiple_choice', 'true_false', 'short_answer'], required: true },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [QuestionSchema]
});

const  model = mongoose.model('Quiz', QuizSchema);
export default model;