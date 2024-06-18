import Course from '../models/course.js'

export const createCource = async(req,res) =>{
    const { title, description } = req.body;

    try {
        const course = new Course({
            title, description , instructor:req.user.id
        })
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

export const approveCourse = async (req,res) =>{
  try {
    const course = await Course.findById(req.params.id);
    if(!course){
      return res.status(404).json({ message: 'Course not found' });
    }

    course.isApproved = true;
    await course.save();
    res.status(200).json(course);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getCourses = async (req,res) => {
    try {
        const courses = await Course.find().populate('instructor', 'name');
        res.status(200).json(courses);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getCoursesById = async (req,res) =>{
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name');
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}