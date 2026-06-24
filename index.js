import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config()

let app=express()
let port=process.env.PORT||8000

app.use("/api",)


app.listen(port,()=>{
    connectDB()
    console.log("-------starting succesfully----------");
})