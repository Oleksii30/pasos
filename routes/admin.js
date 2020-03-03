const express = require('express')
const Admin = require('../models/admin-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const router = express.Router()

router.post('/api/add-admin', (req,res,next)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        const admin = new Admin({
            email: req.body.email,
            password:hash
        })
        return admin.save()
    }) 
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(418).json(err)
    })   
   
})
router.post('/api/login',(req, res, next)=>{
    let fetchedAdmin
    Admin.findOne({email:req.body.email})
    .then(admin=>{
        if (!admin){
            res.status(401).json({message:"Auth failed 1"})
        }
        fetchedAdmin = admin
                
        return bcrypt.compare(req.body.password, admin.password)
    })
    .then(result=>{
      
        if (!result){
            res.status(401).json({message:"Auth failed 2"})
        }
        const token = jwt.sign({email:fetchedAdmin.email, userId:fetchedAdmin._id},
            "jjkjhhfdxdcbbyyresddjllokmjhfd",
             {expiresIn:"1h"})

       res.status(200).json({
           token: token,
           expiresIn: 3600,
           adminId: fetchedAdmin._id
       })
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({message:"Auth failed 3"})
    })
})

module.exports = router