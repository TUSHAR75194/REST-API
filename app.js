const express = require('express');
//const { Route } = require('router');
const app = express();
const studentRoute = require('./api/routes/student');
const userRoute = require('./api/routes/user');
const facultyRoute = require('./api/routes/faculty');
const fileUpload = require('express-fileupload');
// const { route } = require('./api/routes/student');
//const { Router } = require('express');
//const { route } = require('express/lib/router');
//const { Router } = require('express');
const mongoose = require('mongoose');
const { request } = require('express');
const bodyParser = require('body-parser');
mongoose.connect('mongodb+srv://tushar75:pass@cluster0.ii034do.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error',err=>{
    console.log('connection faild');
});
mongoose.connection.on('connected',connected=>{
    console.log('connected with database.....');
});

 app.use(fileUpload({
  useTempFiles:true
 }))
 //app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/student',studentRoute)
app.use('/faculty',facultyRoute);
app.use('/user',userRoute);


// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'app is running' 
//     })
// }) 



// Bad Url Request
app.use((req,res,next)=>{
    res.status(404).json({
      error:'Bad Url Request'
    })
  })
  


// module.exports = app;
//module.exports = Route;

module.exports = app;