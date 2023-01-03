const express = require('express');
const res = require('express/lib/response');
const { status } = require("express/lib/response");
const { default: mongoose } = require('mongoose');
const student = require('../model/student');
const router = express.Router();
const Student = require('../model/student');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dlvnjt9ql', 
    api_key: '635416963145875', 
    api_secret: 'LxiSS5NGcn7V_1EwA1nP6n-drvA',
    secure: true
  });

//const mongoose = require('mongoose');

router.get('/',checkAuth,(req,res,next)=>{
   Student.find()
   .then(result=>{
    res.status(200).json({
        studentData:result
    });
   })
   .catch(err=>{
    console.log(err);
    res.status(500).json({
    error:err
   })
});
 });
 //get id request
 router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            student:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
        error:err
 })
})
 })
 
 
router.post('/',(req,res,next)=>{
    console.log(req.body);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result);

        const student = new Student({
            _id: new mongoose.Types.ObjectId,
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender,
            imagePath:result.url
        });

        student.save()
        .then(result=>{
            // console.log(result);
            res.status(200).json({
                result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
            error:err
            })
        })
    })
  
});


 //delete request
 router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'product deleted' ,
            result: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
 })
})
 })
 ///put request
 router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findOneAndUpdate({_id:req.params.id},{
    $set:{
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    gender:req.body.gender

    }
        })
.then(result=>{
    res.status(200).json({
        updated_student:result
    })
})
.catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
})
 })


//router.get('/',(req, res, next) => {
   
     //msg:'this is student get request'
  

  //});



module.exports = router;