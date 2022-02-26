const express = require('express');
const { default: mongoose } = require('mongoose');
const Student = require('../models/student');
const router = express.Router();

router.get('/',(req,res,next)=>{
     Student.find()
     .then(result=>{
        
         res.status(200).json({
             StudentData : result
         })
     })
     .catch(err =>{
        
        console.log(err);
        res.status(500).json({
            error:err
        })

     })
})
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            StudentOne : result
        })
    })
    .catch(err =>{
        res.status(500).json({
            error:err
        })
    })


})

router.post('/',(req,res,next)=>{
   
   const student =new Student({
       _id:new mongoose.Types.ObjectId,
       name:req.body.name,
       email:req.body.email,
       phone:req.body.phone,
       gender:req.body.gender


   })

   student.save()
   .then(result=>{
       console.log(result),
       res.status(200).json({
           StuentDetails:result
       })
   })
   .catch(err=>{
       console.log(err),
       res.status(500).json({
           error:err
       })
   })

})
router.put('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.findByIdAndUpdate({_id:req.params.id},{
        $set:{
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          gender:req.body.gender

        }
    })
    .then(result=>{
        res.status(200).json({
            UpdatedStuentInfo:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.patch('/:studentId',(req,res,next)=>{

    const id = req.params.studentId;
    const updateOps={};

    for(const info of req.body){
        updateOps[info.key]=info.value;
    }
    Student.updateOne({_id:id},{$set : updateOps})
    
    .exec()
    .then(result=>res.status(200).json(result))
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

router.delete('/:id',(req,res,next)=>{
    Student.remove({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'Student deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports= router;