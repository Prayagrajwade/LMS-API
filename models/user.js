import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','instructor','admin'],
        default:'student'
    }
})



UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error); 
    }
  });

  UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const User = mongoose.model('User',UserSchema);

export default User;

