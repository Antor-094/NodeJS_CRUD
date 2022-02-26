const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/',(req,res,next)=>{
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

module.exports= router;