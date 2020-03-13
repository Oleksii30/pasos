const express = require('express')
const Question = require('../models/question-model')
const checkAuth = require('../midelware/check-auth')

const router = express.Router()


router.post('/api/add-question',checkAuth,(req,res,next)=>{
     
    const question = new Question({
        question:req.body.question,
        answer:req.body.answer,
        
    })

     question.save().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.sendStatus(500)
    })
})

router.get('/api/questions', (req,res,next)=>{
    Question.find()
    .then(questions=>{
        res.status(200).json(questions)
    })
})

router.get('/api/get-question/:id',checkAuth, (req,res,next)=>{
    Question.findById(req.params.id)
    .then(question=>{
        res.status(200).json(question)
    }).catch(err=>{
        res.status(404).json({message: "Question not found"})
    })

})


router.delete('/api/delete-question/:id',checkAuth, (req,res,next)=>{
    
    Question.deleteOne({_id: req.params.id})
    .then(result=>{
        if (result.n > 0){
            res.status(200).json({message:"Question deleted"})
            }else{
                res.status(401).json({message:"Not authorised"})
            }
       
        })
})

router.put('/api/update-question/:id',checkAuth, (req,res,next)=>{
    
    const question = new Question({
        _id:req.params.id,
        question:req.body.question,
        answer:req.body.answer
    })
    
    Question.updateOne({_id:req.params.id}, question)
    .then(result=>{
        if (result.nModified > 0){
        res.status(200).json({question})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    })

})

module.exports = router