import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateToken from "../config/token.js"


export const signUp=async(req,res)=>{
    try{
        const {FirstName,LastName,email,password,userName}=req.body
        if(!FirstName || !LastName || !email ||!password || !userName){
            return res.status(400).json({message:"All fields are required"})
        }
        console.log("req.body",req.body)
        let existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"Email is Already Exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            FirstName,
            LastName,
            email,
            userName,
            password:hashedPassword,
        })
        console.log(user)
        let token;
        try{
          token = generateToken(user._id)
          console.log("SECRET:", process.env.JWT_SECRET);
           console.log(token)

        }catch(err){
            console.log(err);

        }
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIROMENT == "production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
       
        return res.status(201).json({
            FirstName,
            LastName,
            email,
            userName,
            message:"User Created Successfully"
        })
        

    }catch(error){
       
        return res.status(500).json({message:"Internal server error"})
    }
}

export const login=async(req,res)=>{
    try{
          const {email,password}=req.body
          let existUser=await User.findOne({email})
          if(!existUser){return res.status(400).json({message:"email does not exist"})}
          let match=await bcrypt.compare(password,existUser.password)
          if(!match){
            return res.status(400).json({message:"Password is Incorrect"})
          }
          let token ;
          try{

              token=generateToken(existUser._id)
              res.cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENVIROMENT =="production",
                sameSite:"strict",
                maxAge:7*24*60*60*1000
              })
              return res.status(201).json({
            FirstName:existUser.FirstName,
            LastName:existUser.LastName,
            email:existUser.Email,
            userName:existUser.userName,
            message:"Login Successfully"
        })
          }catch(err){
            return res.status(500).json(error)
          }

    }catch(err){
        return res.status(500).json({message:"internal server error"})
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie("token")
       return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
