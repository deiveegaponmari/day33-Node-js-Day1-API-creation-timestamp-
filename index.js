const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const web_server = express();
//folder to store file
const folder=path.join(__dirname,'data');
if(!fs.existsSync(folder)){
    fs.mkdirSync(folder)
}
//API to create new text file
web_server.post('/createfile',(req,res)=>{
    const timestamp=new Date();
    const filename=`${timestamp}`.txt;
    const content=`current timestamp is: ${timestamp}`;
    fs.writeFile(path.join(folder,filename),content,(err)=>{
        if(err){
            return res.status(500).json({error:"failed to create file"})
        }
        res.status(200).json({message:'file created',filename})
    })

});
//API to retrieve all files
web_server.get('/get-files',(res,req)=>{
    fs.readdir(folder,(err,files)=>{
        if(err){
            return res.status(500).json({error:"failed to retrieve files"})
        }
        //filter any file
        const textfiles=files.filter(file=>file.endsWith('.txt'))
        res.status(200).json({files:textfiles})
    })
})

web_server.listen(3000,"localhost",()=>{
    console.log("server started");
    console.log("http://localhost:3000/");
})