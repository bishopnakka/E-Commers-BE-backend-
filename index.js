const express=require('express')
const cors=require('cors')
const Razorpay=require('razorpay')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())

const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
}) 
app.post('/create-order',async (req,res)=>{
      try {
        const order=await razorpay.orders.create({
            amount:Number(req.body.amount) * 100,
            currency:"INR"
        })
        res.send(order)
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
})

app.listen('5006',()=>{
    console.log("server runniong on port 5006")
})