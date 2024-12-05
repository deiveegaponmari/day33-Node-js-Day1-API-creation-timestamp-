const express = require('express');
const fs = require('fs');
const path = require('path');
const web_server = express();
//folder name
const foldername='data';
//middleare to parse json requests
web_server.use(express.json());

const ensurefolderexists=(folder)=>{
    if(!fs.existsSync(folder)){
        fs.mkdirSync(folder,{recursive:true});
    }
};


//API to create new text file
web_server.post('/createfile',(req,res)=>{
    ensurefolderexists(foldername);
    //generate timestamp
const timestamp=new Date().toISOString();
const filename=`${timestamp.replace(/:/g,"-")}.txt`;
const filepath=path.join(foldername,filename);

   //filestamp for file content
    fs.writeFileSync(filepath,timestamp,(err)=>{
        if(err){
            return res.status(500).json({error:"failed to create file"})
        }
        res.status(200).json(
            {message:'file created',
            filename:filename,
        content:timestamp})
    })

});
//API to retrieve all files
web_server.get('/get-files',(res,req)=>{
    ensurefolderexists(foldername);
    fs.readdir(foldername,(err,files)=>{
        if(err){
            return res.status(500).json({error:"failed to retrieve files"})
        }
        //filter any file
        //const textfiles=files.filter(file=>file.endsWith('.txt'))
        res.status(200).json({
            files:files,
        })
    })
})
//start server
web_server.listen(3000,"localhost",()=>{
    console.log("server started");
    console.log("http://localhost:3000/");
})