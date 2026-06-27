import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cors from "cors"

dotenv.config()

let app=express()
let port=process.env.PORT||8000

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true
}))


app.use(express.json())


app.use("/api",authRouter)


app.listen(port,()=>{
    connectDB()
    console.log("-------starting succesfully----------");
})