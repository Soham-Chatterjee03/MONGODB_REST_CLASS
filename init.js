const mongoose = require('mongoose');
const Chat=require("./models/chat.js");



main()
    .then(()=>{
    console.log("Connection successful");
    })
    .catch((err)=>
    console.log(err)
    );

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allchats=[
    {
        form :"neha",
        to:"priya",
        msg:"Send me your exam sheets",
        created_at:new Date(),
    },
    {
        form :"rohit",
        to:"neha",
        msg:"Send me your photo",
        created_at:new Date(),
    },
    {
        form :"soham",
        to:"sanjana",
        msg:"Noiceeee",
        created_at:new Date(),
    },
    {
        form :"sanjana",
        to:"soham",
        msg:"Thank you soo much",
        created_at:new Date(),
    },
    {
        form :"neha",
        to:"sanjana",
        msg:"How are you?",
        created_at:new Date(),
    }
]
Chat.insertMany(allchats);
