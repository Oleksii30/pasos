const express = require('express')
const Course = require('../models/course-model')
const checkAuth = require('../midelware/check-auth')

const router = express.Router()


router.post('/add-course', async(req,res,next)=>{
    try {
        const course = new Course({
            lenguage:req.body.lenguage,
            level:req.body.level,
            price:req.body.price,
            schedule:req.body.schedule,
            duration:req.body.duration,
            description:req.body.description
        })
        const result = await course.save()
        res.status(200).json(result)
    } catch (error) {
        res.sendStatus(500)
    }     
})

router.get('/courses', async (req,res,next)=>{
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (error) {
        res.sendStatus(500)
    }   
})

router.get('/get-course/:id', async (req,res,next)=>{
    try {
        const course = await Course.findById(req.params.id)
        res.status(200).json(course)
    } catch (error) {
        res.status(404).json({message: "Course was not found"})
    } 

})


router.delete('/delete-course/:id', async (req,res,next)=>{
    try {
        const result = await Course.deleteOne({_id: req.params.id})
        if (result.n > 0){
            res.status(200).json({message:"Course deleted"})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    } catch (error) {
        res.sendStatus(500)
    }
    
})

router.put('/update-course/:id', async (req,res,next)=>{
    try {
        const course = new Course({
            _id:req.params.id,
            lenguage:req.body.lenguage,
            level:req.body.level,
            price:req.body.price,
            schedule:req.body.schedule,
            duration:req.body.duration,
            description:req.body.description
        })
        const result = await Course.updateOne({_id:req.params.id}, course)
        if (result.nModified > 0){
            res.status(200).json({course})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    } catch (error) {
        res.sendStatus(500)
    }    
})

module.exports = router