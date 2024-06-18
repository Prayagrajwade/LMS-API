import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import auth from './routes/auth.js'
import course from './routes/course.js'
import User from './models/user.js';
import user from './routes/user.js';
import assignment from './routes/assignment.js'
import quizRoutes from './routes/quizRoutes.js'


connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth',auth);
app.use('/api/courses',course);
app.use('/api/users', user);
app.use('/api/assignments', assignment);
app.use('/api/quizzes', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`);
})