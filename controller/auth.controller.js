export const signUp=async(req,res)=>{
    try{
        const {FirstName,LastName,email,password,userName}=req.body
        let existUser=await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"Email is Already Exist"})
        }

    }catch(error){
       
        return res.status(500).json({message:"Internal server error"})
    }
}