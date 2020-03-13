const express = require('express')
const Student = require('../models/user-model')
const checkAuth = require('../midelware/check-auth')

const router = express.Router()


router.post('/api/add-student',(req,res,next)=>{
   
    const student = new Student({
        lenguage:req.body.lenguage,
        level:req.body.level,
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        phone:req.body.phone
    })
    student.save().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.sendStatus(500)
    })
})



router.get('/api/students',checkAuth, (req,res,next)=>{
    Student.find()
    .then(students=>{
        res.status(200).json(students)
    })
})

router.delete('/api/delete-student/:id',checkAuth, (req,res,next)=>{
    
    Student.deleteOne({_id: req.params.id})
    .then(result=>{
        if (result.n > 0){
            res.status(200).json({message:"Student deleted"})
            }else{
                res.status(401).json({message:"Not authorised"})
            }
       
        })
})

module.exports = router