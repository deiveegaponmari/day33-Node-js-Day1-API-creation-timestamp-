const { error } = require('node:console');
const filesys = require('node:fs');
const {timestamp}=require('./timestamp');

function makediectory(){
filesys.mkdir("./filesys",(error)=>{
    console.log(error)
})
}
function createTextfile(){
    filesys.appendFileSync('./filesys/date-time.txt',
    "This is current date and time" + timestamp() );
}
 module.exports ={
    makediectory,
    createTextfile
 }