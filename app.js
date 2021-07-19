 const express = require ('express');
 const app = express();

 const TaskList = require ('./database/models/TaskList');
 const Task = require ('./database/models/Task');

 //direct way to do by adding 3rd party library app.use(cors());
 //example of middleware
 app.use(function(req,res,next){
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
   res.setHeader('Access-Control-Allow-Headers','origin,X-Requested with, Content-Type,Accepted');
   next();
 });
 app.use(express.json());

 const mongoose = require('./database/mongoose');
 app.get('/tasklists',(req,res)=>{
   TaskList.find({})
   .then((lists)=>{res.status(200).send(lists)
 })
   .catch((error)=>{
     console.log(error);
     res.status(500);
   });
 });
 app.get(
   'tasklists/:tasklistId',(req,res)=>{
     let tasklistId =req.params.tasklistId;
    TaskList.find({_id:tasklistId})
    .then((taskList)=>{
    res.status(200).send(taskList)})
    .catch((error)=> {console.log(error)});
   }
 );
   
 app.post('/tasklists',(req,res)=>{
   console.log(req.body);

   let taskListObj = {'title':req.body.title};
   TaskList(taskListObj).save()
   .then((taskList)=>{res.status(201).send(taskList)
   })
     .catch((error)=>{
       console.log(error);
       res.status(500);
     });
   });
   app.put('tasklists/:tasklistId',(req,res)=>{
      TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set : req.body})
      .then((taskList)=>{
        res.status(200).send(taskList)})
        .catch((error)=> {console.log(error)});
   });

   app.patch('tasklists/:tasklistId',(req,res)=>{
    TaskList.findOneAndUpdate({_id:req.params.tasklistId},{$set : req.body})
    .then((taskList)=>{
      res.status(200).send(taskList)})
      .catch((error)=> {console.log(error)});
 });

 app.delete('tasklists/:tasklistId',(req,res)=>{
  TaskList.findByIdAndDelete({req.params.tasklistId})
  .then((taskList)=>{
    res.status(201).send(taskList)})
    .catch((error)=> {console.log(error)});
});

 app.listen(3000,()=> {
    console.log("server started on port 3000 GO ");  
  });