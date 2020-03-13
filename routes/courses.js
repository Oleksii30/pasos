const express = require('express')
const Course = require('../models/course-model')
const checkAuth = require('../midelware/check-auth')

const router = express.Router()


router.post('/api/add-course',checkAuth, (req,res,next)=>{
     
    const course = new Course({
        lenguage:req.body.lenguage,
        level:req.body.level,
        price:req.body.price,
        schedule:req.body.schedule
    })

     course.save().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.sendStatus(500)
    })
})

router.get('/api/courses/:lenguage', (req,res,next)=>{
    Course.find({lenguage:req.params.lenguage})
    .then(courses=>{
        res.status(200).json(courses)
    })
})

router.get('/api/get-course/:id',checkAuth, (req,res,next)=>{
    Course.findById(req.params.id)
    .then(course=>{
        res.status(200).json(course)
    }).catch(err=>{
        res.status(404).json({message: "Course not found"})
    })

})


router.delete('/api/delete-course/:id',checkAuth, (req,res,next)=>{
    
    Course.deleteOne({_id: req.params.id})
    .then(result=>{
        if (result.n > 0){
            res.status(200).json({message:"Course deleted"})
            }else{
                res.status(401).json({message:"Not authorised"})
            }
       
        })
})

router.put('/api/update-course/:id',checkAuth, (req,res,next)=>{
    
    const course = new Course({
        _id:req.params.id,
        lenguage:req.body.lenguage,
        level:req.body.level,
        price:req.body.price,
        schedule:req.body.schedule
    })
    
    Course.updateOne({_id:req.params.id}, course)
    .then(result=>{
        if (result.nModified > 0){
        res.status(200).json({course})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    })

})

module.exports = router