const express = require('express');
const web_server=express();
const {makediectory,createTextfile} =require('./utils/filesys');
const {timestamp}=require('./utils/timestamp')

web_server.get("/",(req,res)=>{
    console.log("get value")
    res.send("srikanth")
})
web_server.listen(3000,"localhost",()=>{
    console.log("server started",timestamp());
    makediectory();
    createTextfile();
})