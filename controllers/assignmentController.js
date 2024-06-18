import Assignment from "../models/assignment.js";
import Course from '../models/course.js';

// Create a new assignment
export const createAssignment = async (req, res) => {
  const { title, description, dueDate, courseId } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const assignment = new Assignment({
      title,
      description,
      dueDate,
      course: courseId,
      instructor: req.user.id
    });

    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Submit an assignment
export const submitAssignment = async (req, res) => {
  const { assignmentId, fileUrl } = req.body;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    assignment.submissions.push({ student: req.user.id, fileUrl });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Grade an assignment
export const gradeAssignment = async (req, res) => {
  const { assignmentId, studentId, grade, feedback } = req.body;
  try {
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    const submission = assignment.submissions.find(sub => sub.student.toString() === studentId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    submission.grade = grade;
    submission.feedback = feedback;
    await assignment.save();
    res.status(200).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
