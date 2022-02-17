const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const Student = require('../models/student');
const mongoose = require('mongoose');


router.get('/',(req, res, next) => {

  Student.find()
  .exec()
  .then(result => res.status(200).json(result))
  .catch(err => res.status(500).json(err));
})

router.post('/',(req, res, next) => {

    const info ={
        _id:mongoose.Types.ObjectId,
        name: req.body.name,
        batch:req.body.batch
    }
    const student = new Student(info);
    student.save()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
})

router.get('/studentId',(req, res, next) => {

const id= req.params.studentId;

    Student.findById(id)
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
  })
  
  router.delete('/',(req, res, next) => {
    
    const id = req.params.studentId;
    Student.deleteOne({_id: id})
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(err));
  })
  

module.exports = router;