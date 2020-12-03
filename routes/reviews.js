const express = require('express')
const Review = require('../models/review-model')
const checkAuth = require('../midelware/check-auth')


const router = express.Router()


router.post('/reviews/create', async (req, res, next)=>{
   
    try{             
        const review = new Review({
            name:req.body.name,
            comment:req.body.comment,
            image:req.body.image            
        })

        await review.save()
        
        res.status(201).send()
    }catch(err){
        res.status(400).send()
    }

})

router.get('/reviews', async (req, res, next)=>{
    try{
        const reviews = await Review.find()
        res.status(200).send(reviews)
    }catch(error) {
        res.status(500).send(error)
    }    
})

router.delete('/reviews/:id', async (req, res, next)=>{
    try{
        const result = await Review.deleteOne({_id: req.params.id})
        if (result.n > 0){
            res.status(200).json({message:"review deleted"})
        }else{
            res.status(401).json({message:"Not authorised"})
        }
    }catch(error){
        res.status(500).send(error)
    }    
})

router.get('/review/:id', async (req,res,next)=>{
    try{
        const review = await Review.findById(req.params.id)
        res.status(200).json(review)
    }catch(error){
        res.status(404).send()
    }    
})

router.put('/reviews/update/:id', async (req,res,next)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'comment', 'image']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const review = await Review.findById(req.params.id)

        updates.forEach((update) => review[update] = req.body[update])
        await review.save()

        if (!review) {
            return res.status(404).send()
        }

        res.send(review)
    } catch (e) {
        res.status(400).send(e)
    }
} )



module.exports = router