import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description: { 
        type: String, 
        required: true
     },
     instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     },
     isApproved:{
        type:Boolean,
        default:false
     }
})

const Course = mongoose.model('Course',courseSchema);
export default Course;