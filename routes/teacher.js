const express = require('express')
const Teacher = require('../models/teacher-model')
const checkAuth = require('../midelware/check-auth')


const router = express.Router()


router.post('/teachers/create', checkAuth, async (req, res, next)=>{
   
    try{
             
        const teacher = new Teacher({
            name:req.body.name,
            description:req.body.description,
            avatar:req.body.url,
            header:req.body.header,
            quote:req.body.quote
        })

        await teacher.save()
        
        res.status(201).send()
    }catch(err){
        res.status(400).send()
    }

})

router.get('/teachers', (req, res, next)=>{
    Teacher.find()
    .then(teachers=>{
        res.status(200).send(teachers)
    })
})

router.delete('/teachers/:id',checkAuth, (req, res, next)=>{
    Teacher.deleteOne({_id: req.params.id})
    .then(result=>{
        if (result.n > 0){
            res.status(200).json({message:"Teacher deleted"})
            }else{
                res.status(401).json({message:"Not authorised"})
            }
       
        })
})

router.get('/teacher/:id', checkAuth, (req,res,next)=>{
    Teacher.findById(req.params.id)
    .then(teacher=>{
       
        res.status(200).json(teacher)
    }).catch(err=>{
        res.status(404).send()
    })
})

router.put('/teachers/update/:id', checkAuth, async (req,res,next)=>{
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
