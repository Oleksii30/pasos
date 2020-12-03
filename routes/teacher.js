const express = require('express')
const Teacher = require('../models/teacher-model')
const checkAuth = require('../midelware/check-auth')


const router = express.Router()


router.post('/teachers/create', async (req, res, next)=>{
   
    try{             
        const teacher = new Teacher({
            name:req.body.name,
            description:req.body.description,
            avatar:req.body.avatar,
            header:req.body.header,
            quote:req.body.quote
        })

        await teacher.save()
        
        res.status(201).send()
    }catch(err){
        res.status(400).send()
    }

})

router.get('/teachers', async (req, res, next)=>{
    try{
        const teachers = await Teacher.find()
        res.status(200).send(teachers)
    }catch(error) {
        res.status(500).send(error)
    }    
})

router.delete('/teachers/:id', async (req, res, next)=>{
    try{
        const result = await Teacher.deleteOne({_id: req.params.id})
        if (result.n > 0){
            res.status(200).json({message:"Teacher deleted"})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    }catch(error){
        res.status(500).send(error)
    }    
})

router.get('/teacher/:id', async (req,res,next)=>{
    try{
        const teacher = await Teacher.findById(req.params.id)
        res.status(200).json(teacher)
    }catch(error){
        res.status(404).send()
    }    
})

router.put('/teachers/update/:id', async (req,res,next)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'avatar', 'header', 'quote']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const teacher = await Teacher.findById(req.params.id)

        updates.forEach((update) => teacher[update] = req.body[update])
        await teacher.save()

        if (!teacher) {
            return res.status(404).send()
        }

        res.send(teacher)
    } catch (e) {
        res.status(400).send(e)
    }
} )



module.exports = router
