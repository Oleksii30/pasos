const express = require('express')
const Question = require('../models/question-model')
const checkAuth = require('../midelware/check-auth')

const router = express.Router()


router.post('/add-question', async (req,res,next)=>{
     
    try{
        const question = new Question({
            question:req.body.question,
            answer:req.body.answer,        
        })
        const result = await question.save()
        res.status(200).json(result)
    }catch(error){
        res.sendStatus(500)
    }
     
})

router.get('/questions',async (req,res,next)=>{
    try{
        const questions = await Question.find()
        res.status(200).json(questions)
    }catch(error){
        res.sendStatus(404)
    }    
})

router.get('/get-question/:id',async (req,res,next)=>{
    try{
        const question = await Question.findById(req.params.id)
        res.status(200).json(question)
    }catch(error){
        res.status(404).json({message: "Question not found"})
    }    
})


router.delete('/delete-question/:id',async (req,res,next)=>{
    try{
        const result = await Question.deleteOne({_id: req.params.id})
        if (result.n > 0){
            res.status(200).json({message:"Question deleted"})
        }else{
            res.status(401).json({message:"Not authorised"})
        }

    }catch(error){
        res.sendStatus(500)
    }    
})

router.put('/update-question/:id',async (req,res,next)=>{

    try{
        const question = new Question({
            _id:req.params.id,
            question:req.body.question,
            answer:req.body.answer
        })
        const result = await Question.updateOne({_id:req.params.id}, question)
        if (result.nModified > 0){
            res.status(200).json({question})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    }catch(error){
        res.sendStatus(500)
    }    
    
})

module.exports = router