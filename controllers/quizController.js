import Quiz from '../models/quiz.js'


export const createQuiz = async (req, res) => {
  const { title, description, course, questions } = req.body;
  try {
    const quiz = await Quiz.create({
      title,
      description,
      course,
      instructor: req.user.id,
      questions
    });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.questionType !== 'short_answer' && question.correctAnswer === answers[index]) {
        score += 1;
      }
    });
    
    res.status(200).json({ score, totalQuestions: quiz.questions.length });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('course').populate('instructor', 'name');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
