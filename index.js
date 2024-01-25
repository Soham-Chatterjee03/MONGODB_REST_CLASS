const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat.js");
const { render } = require("ejs");
const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

// let chat1=new Chat({
//     form :"neha",
//     to:"priya",
//     msg:"Send me your exam sheets",
//     created_at:new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });
app.get("/",(req,res)=>{
    res.render("home.ejs");
    
    
});


//INDEX ROUTE
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});
//NEW ROUTE
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
//CREATE ROUTE
app.post("/chats",(req,res)=>{
    let {form,to,msg}=req.body;
    let newChat=new Chat({
        form:form,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat
        .save()
        .then((res)=>{
            console.log("Chat was saved")
        })
        .catch((err)=>
        {console.log(err)
        });
    res.redirect("/chats");
});
//EDIT
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//UPDATE ROUTE
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg}
        ,{runValidators:true,new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
});
//DESTROY
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedCHAT=await Chat.findByIdAndDelete(id);
    console.log(deletedCHAT);
    res.redirect("/chats");
});




app.listen(8080,()=>{
    console.log("Serve is listining on port 8080");
});
