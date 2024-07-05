import express from 'express'
import { createClient } from 'redis'

const client=createClient();
const app=express();
app.use(express.json());

app.post('/put',async (req,res)=>{
    if(!req.body) return res.status(404).json({
        message:'No messages Sent'
    })
   const {message,username} =req.body;
    try{
        await client.publish(username,message);
        console.log('Message Sent');
    }catch(e){
        console.error(e);
        return res.json(503).json({
            message:"Something went wrong"
        })
    }
    return res.status(200).json({
        message:"OK"
    })

})

const startClient=async ()=>{
    try{
        await client.connect();
        console.log("Redis Connected Sucessfully");
        app.listen(3000,()=>{
            console.log("App is Listening on Port 3000")
        });
    }catch(e){
        console.error(e);
    }
}
startClient();
