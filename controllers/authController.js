
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";


export const register = async (req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
    }
   const {name,email,password,role} = req.body;
   try {
      const user = new User({
        name,email,password,role
      })

      await user.save();

      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,
        {expiresIn:36000}
      )

      res.status(201).json({ token });

   } catch (error) {
    res.status(400).json({message:err.message});
   }
}

// export const login = async (req,res) => {
//     const {email,password} = req.body;

//     try {
//         const user = User.find({email});

//         if(!user){
//             return res.status(400).json({msg:'Invalid Credentials'})
//            }
    
//            const isMatch = await bcrypt.compare(password,user.password);
    
//         if(!isMatch){
//             return res.status(400).json({mag:"Invalid Credentials"});
//         }
    
//         const token = jwt.sign({id:user._id},process.env.JWT_TOKEN,{expiresIn:'1h'});
//         res.status(200).json({ token });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }


// } 

export const login = async (req,res) => {
    const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password,user.password);
    
    if(!isMatch){
        return res.status(400).json({mag:"Invalid Credentials"});
    } 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn:36000 });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 
