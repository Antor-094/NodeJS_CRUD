const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                error : err
            })
        }
        else 
        { 
        const newuser = new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                email:req.body.email,
                phone:req.body.phone,
                userType:req.body.userType

            })

            newuser.save()
            .then(result=>{
                res.status(200).json({
                   
                    result:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

router.post('/signin',(req,res,next)=>{
  User.find({username:req.body.username})
  .exec()
  .then(user=>{
    if(user.length <1){
      return res.status(401).json({
        mes:'User not exist'
      })
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(!result){
        return res.status(401).json({
          mes:'Password not matched'
        })
      }
      if(result){
        const token = jwt.sign({
          username:user[0].username,
          userType:user[0].userType,
          email:user[0].email,
          phone:user[0].phone
        },

        'this is secret token key',
        {
          expiresIn:"24h"
        }
        );
        res.status(200).json({
          username:user[0].username,
          userType:user[0].userType,
          email:user[0].email,
          phone:user[0].phone,
          token:token
        })
      }
    })
  })
  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })
})

module.exports= router;